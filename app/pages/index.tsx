import React from 'react';
import Link from 'next/link';
import { gql } from 'apollo-boost';

import cookies from 'next-cookies';
import appConfig from '@template/shared/app';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/apollo/withApollo';

const QUERY = gql`
  {
    userGet(password: "heslo") {
      id
    }
  }
`;

const Index = props => {
  const { loading, data } = useQuery(QUERY);

  console.log(loading, data);

  const changeCookie = () => {
    document.cookie = `${appConfig.cookies.token}=ahoj; path=/`;
  };

  return (
    <>
      <div>
        {data ? data.userGet.id : '-'}
        <Link href={{ pathname: '/a' }}>a</Link>
        <button onClick={changeCookie}>a</button>
      </div>
    </>
  );
};

Index.getInitialProps = ctx => {
  return { cookie: cookies(ctx).template };
};

export default withApollo(Index);
