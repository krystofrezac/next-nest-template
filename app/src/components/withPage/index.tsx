import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useCookies } from 'react-cookie';

import appConfig from '@template/shared/config/app';

import withApollo from 'lib/apollo/withApollo';

import Page from 'components/withPage/Page';
import hasResources from 'components/resources/hasResources';
import rolesToResources from 'components/resources/rolesToResources';
import NoAccess from 'components/withPage/NoAccess';

import { Breadcrumb, UserGetLogged } from './types';

const USER_GET_LOGGED = gql`
  {
    userGetLogged {
      id
      name
      surname
      roles {
        id
        resources {
          id
          name
        }
      }
      darkTheme
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
    const [cookies, setCookie] = useCookies();

    const { data, error } = useQuery<UserGetLogged>(USER_GET_LOGGED);

    if (data) {
      if (cookies[appConfig.cookies.darkTheme] !== data.userGetLogged.darkTheme.toString()) {
        setCookie(appConfig.cookies.darkTheme, data.userGetLogged.darkTheme);
      }
    }

    const userResources = rolesToResources(data?.userGetLogged?.roles || []);

    const showPage = (!error && hasResources(userResources, requiredResources)) || !process.browser;

    return (
      <>
        {showPage && (
          <Page
            user={data?.userGetLogged}
            Component={Component}
            breadcrumbs={breadcrumbs}
            {...props}
          />
        )}
        {!showPage && <NoAccess />}
      </>
    );
  }, apolloSsr);
  return WithPage;
};

export default withPage;
