import React from 'react';
import nextApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import cookies from 'next-cookies';
import browserCookies from 'browser-cookies';
import appConfig from '../../../../shared/config/app';

const apolloProvider = ({ Page, props }) => {
  return (
    <ApolloProvider client={props.apollo}>
      <Page {...props} />
    </ApolloProvider>
  );
};

export const withApolloPure = nextApollo(
  ({ initialState, ctx }) => {
    const token = !process.browser
      ? cookies(ctx)[appConfig.cookies.token]
      : browserCookies.get(appConfig.cookies.token);
    console.log('token', token);
    return new ApolloClient({
      uri: process.browser ? appConfig.api.clientUrl : appConfig.api.serverUrl,
      cache: new InMemoryCache().restore(initialState || {}),
      request: operation => {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      },
    });
  },
  {
    render: apolloProvider,
  },
);

const withApollo = Component => {
  return withApolloPure(Component, { getDataFromTree });
};

export default withApollo;
