// lib/withApollo.js
import React from 'react';
import nextApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import appConfig from '../../../../shared/app';

const apolloProvider = ({ Page, props }) => {
  return (
    <ApolloProvider client={props.apollo}>
      <Page {...props} />
    </ApolloProvider>
  );
};

const withApolloPure = nextApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: process.browser ? appConfig.api.clientUrl : appConfig.api.serverUrl,
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: apolloProvider,
  },
);

const withApollo = (Component, ssr: boolean = true) => {
  if (ssr) return withApolloPure(Component, { getDataFromTree });
  return withApolloPure(Component);
};

export default withApollo;
