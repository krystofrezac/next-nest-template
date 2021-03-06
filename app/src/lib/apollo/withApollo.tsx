import React from 'react';
import nextApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import cookies from 'next-cookies';
import browserCookies from 'browser-cookies';
import appConfig from '@template/shared/config/app';

const apolloProvider = ({ Page, props }) => {
  return (
    <ApolloProvider client={props.apollo}>
      <Page {...props} />
    </ApolloProvider>
  );
};

export const withApolloPure = nextApollo(
  ({ initialState, ctx }) => {
    return new ApolloClient({
      uri: process.browser ? appConfig.api.clientUrl : appConfig.api.serverUrl,
      cache: new InMemoryCache().restore(initialState || {}),
      request: operation => {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${
              // eslint-disable-next-line no-nested-ternary
              process.browser
                ? browserCookies.get(appConfig.cookies.token)
                : ctx
                ? cookies(ctx)[appConfig.cookies.token]
                : ''
            }`,
          },
        });
      },
    });
  },
  {
    render: apolloProvider,
  },
);

const withApollo = (Component, ssr: boolean = false) => {
  if (ssr) return withApolloPure(Component, { getDataFromTree });
  return withApolloPure(Component);
};

export default withApollo;
