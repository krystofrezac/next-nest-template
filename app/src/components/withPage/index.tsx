import React from 'react';

import withApollo from 'lib/apollo/withApollo';

import Page from 'components/withPage/Page';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Error from 'next/error';
import { Breadcrumb } from './types';

const USER_GET_LOGGED = gql`
  {
    userGetLogged {
      id
    }
  }
`;

const withPage = (
  Component: React.FunctionComponent,
  name: string,
  breadcrumbs: Breadcrumb[],
  apolloSsr: boolean = false,
) => {
  const WithPage = withApollo((props: any) => {
    const { error } = useQuery(USER_GET_LOGGED);

    if (!error)
      return <Page Component={Component} name={name} breadcrumbs={breadcrumbs} {...props} />;
    return <Error statusCode={401} title="Na tuto stránku nemáte přístup" />;
  }, apolloSsr);
  return WithPage;
};

export default withPage;
