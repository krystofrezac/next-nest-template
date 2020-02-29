import React from 'react';

import withApollo from 'lib/apollo/withApollo';

import Page from 'components/withPage/Page';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import hasResources from 'components/resources/hasResources';
import { State } from 'redux/reducers/types';
import { connect } from 'react-redux';
import rolesToResources from 'components/resources/rolesToResources';
import dynamic from 'next/dynamic';
import { Breadcrumb } from './types';

const Error = dynamic(import('next/error'), { ssr: false });

const USER_GET_LOGGED = gql`
  {
    userGetLogged {
      id
    }
  }
`;

const mapStateToProps = (state: State) => ({
  userRoles: state.user.roles,
});

const withPage = (
  Component: React.ComponentType,
  name: string,
  breadcrumbs: Breadcrumb[],
  requiredResources: string[] = [],
  apolloSsr: boolean = false,
) => {
  const WithPage = withApollo(
    connect(mapStateToProps)(({ userRoles, ...props }: any) => {
      const { error } = useQuery(USER_GET_LOGGED, { fetchPolicy: 'no-cache' });

      const userResources = rolesToResources(userRoles);

      const showPage =
        (!error && hasResources(userResources, requiredResources)) || !process.browser;

      return (
        <>
          {showPage && (
            <Page Component={Component} name={name} breadcrumbs={breadcrumbs} {...props} />
          )}
          {!showPage && (
            <Error
              // @ts-ignore
              style={{ display: 'none' }}
              statusCode={401}
              title="Na tuto stránku nemáte přístup"
            />
          )}
        </>
      );
    }),
    apolloSsr,
  );
  return WithPage;
};

export default withPage;
