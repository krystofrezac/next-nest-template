import React from 'react';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useCookies } from 'react-cookie';

import appConfig from '@template/shared/config/app';

import withApollo from 'lib/apollo/withApollo';

import Page from 'components/withPage/Page';

import useResources from 'components/resources/useResources';
import dynamic from 'next/dynamic';
import { Breadcrumb, UserGetLogged } from './types';

const NoAccess = dynamic(import('components/withPage/NoAccess'), { ssr: false });

const USER_GET_LOGGED = gql`
  {
    userGetLogged {
      id
      name
      surname
      darkTheme
    }
  }
`;

const withPage = (
  Component: React.ComponentType,
  breadcrumbs: Breadcrumb[],
  requiredResources: string[][] = [],
  apolloSsr: boolean = false,
) => {
  const WithPage = withApollo((props: any) => {
    const hasAccess = useResources(requiredResources);
    const [cookies, setCookie] = useCookies();

    const { data, error } = useQuery<UserGetLogged>(USER_GET_LOGGED, {
      fetchPolicy: 'cache-and-network',
    });

    if (data) {
      if (cookies[appConfig.cookies.darkTheme] !== data.userGetLogged.darkTheme.toString()) {
        setCookie(appConfig.cookies.darkTheme, data.userGetLogged.darkTheme);
      }
    }

    const showPage = !error && hasAccess;

    return (
      <>
        {!showPage && <NoAccess />}
        {(showPage || !process.browser) && (
          <Page
            user={data?.userGetLogged}
            Component={Component}
            breadcrumbs={breadcrumbs}
            {...props}
          />
        )}
      </>
    );
  }, apolloSsr);
  return WithPage;
};

export default withPage;
