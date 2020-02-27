import React from 'react';

import withApollo from 'lib/apollo/withApollo';

import Page from 'components/withPage/Page';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Error from 'next/error';
import hasResources from 'components/resources/hasResources';
import { State } from 'redux/reducers/types';
import { connect } from 'react-redux';
import rolesToResources from 'components/resources/rolesToResources';
import { Breadcrumb } from './types';

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
  Component: React.FunctionComponent,
  name: string,
  breadcrumbs: Breadcrumb[],
  requiredResources: string[] = [],
  apolloSsr: boolean = false,
) => {
  const WithPage = withApollo(
    connect(mapStateToProps)(({ userRoles, ...props }: any) => {
      console.log('props', props);
      const { error } = useQuery(USER_GET_LOGGED);

      if (!error) {
        const userResources = rolesToResources(userRoles);
        console.log('userResources', userResources);
        if (hasResources(userResources, requiredResources))
          return <Page Component={Component} name={name} breadcrumbs={breadcrumbs} {...props} />;
      }
      return <Error statusCode={401} title="Na tuto stránku nemáte přístup" />;
    }),
    apolloSsr,
  );
  return WithPage;
};

export default withPage;
