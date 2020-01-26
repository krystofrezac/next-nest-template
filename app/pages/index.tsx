import React from 'react';
import Link from 'next/link';
import { gql } from 'apollo-boost';

import cookies from 'next-cookies';
import appConfig from '@template/shared/app';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/apollo/withApollo';

const QUERY = gql`
  query Dog($password: String!) {
    userGet(password: $password) {
      id
    }
  }
`;

const Index = props => {
  const { loading, data, error } = useQuery(QUERY, { variables: { password: props.cookie } });

  if (error) {
    console.clear();
    // @ts-ignore
    console.log('a', error.graphQLErrors[0].message.statusCode);
  }

  const changeCookie = () => {
    document.cookie = `${appConfig.cookies.token}=ahoj; path=/`;
  };

  return (
    <>
      <div>
        <div>{data ? data.userGet.id : '-'}</div>
        <div>{props.cookie}</div>
        <Link href={{ pathname: '/a' }}>a</Link>
        <button onClick={changeCookie}>a</button>
      </div>
    </>
  );
};

Index.getInitialProps = ctx => {
  return { cookie: cookies(ctx)[appConfig.cookies.token] };
};

export default withApollo(Index);
