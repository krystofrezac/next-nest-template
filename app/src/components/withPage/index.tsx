import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import withApollo from 'lib/apollo/withApollo';

import Page from 'components/withPage/Page';
import hasResources from 'components/resources/hasResources';
import rolesToResources from 'components/resources/rolesToResources';
import NoAccess from 'components/withPage/NoAccess';

import { Breadcrumb } from './types';

const USER_GET_LOGGED = gql`
  {
    userGetLogged {
      id
    }
  }
`;

const withPage = (
  Component: React.ComponentType,
  breadcrumbs: Breadcrumb[],
  requiredResources: string[] = [],
  apolloSsr: boolean = false,
) => {
  const WithPage = withApollo((props: any) => {
    const { error } = useQuery(USER_GET_LOGGED, { fetchPolicy: 'no-cache' });

    // TODO roles
    const userResources = rolesToResources([]);

    const showPage = (!error && hasResources(userResources, requiredResources)) || !process.browser;

    return (
      <>
        {showPage && <Page Component={Component} breadcrumbs={breadcrumbs} {...props} />}
        {!showPage && <NoAccess />}
      </>
    );
  }, apolloSsr);
  return WithPage;
};

export default withPage;
