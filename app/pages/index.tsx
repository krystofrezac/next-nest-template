import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import cookies from 'next-cookies';
import { connect } from 'react-redux';

import appConfig from '@template/shared/app';

import withApollo from 'lib/apollo/withApollo';

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

    if (error.graphQLErrors.length > 0) {
      // @ts-ignore
      console.log('a', error.graphQLErrors[0].message.statusCode);
    }
  }

  const changeCookie = () => {
    document.cookie = `${appConfig.cookies.token}=ahoj; path=/`;
  };

  return (
    <>
      <div>
        <input type="text" value={props.foo} onChange={e => props.changeFoo(e.target.value)} />
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

const mapStateToProps = state => ({
  foo: state.foo,
});

const mapDispatchToProps = dispatch => ({
  changeFoo: foo => dispatch({ type: 'FOO', payload: foo }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(Index));
