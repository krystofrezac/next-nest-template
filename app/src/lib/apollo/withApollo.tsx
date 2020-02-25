// lib/withApollo.js
import React from 'react';
import nextApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import appConfig from '../../../../shared/config/app';

const apolloProvider = ({ Page, props }) => {
  return (
    <ApolloProvider client={props.apollo}>
      <Page {...props} />
    </ApolloProvider>
  );
};

export const withApolloPure = (token: string = '') =>
  nextApollo(
    ({ initialState }) => {
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

const withApollo = (Component, token: string = '', ssr: boolean = true) => {
  if (ssr) return withApolloPure(token)(Component, { getDataFromTree });
  return withApolloPure(token)(Component);
};

export default withApollo;
