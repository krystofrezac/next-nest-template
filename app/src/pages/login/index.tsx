import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import appConfig from '@template/shared/config/app';

import withApollo from 'lib/apollo/withApollo';

import { UserLogin } from './types';
import Login from './login';

const USER_LOGIN = gql`
  query userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      id
      accessToken
      name
      surname
      email
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

const USER_GET_LOGGED = gql`
  {
    userGetLogged {
      id
    }
  }
`;

const LoginIndex = () => {
  const [userLogin, { loading, data, error }] = useLazyQuery<UserLogin>(USER_LOGIN);
  const { data: loggedData } = useQuery(USER_GET_LOGGED, { fetchPolicy: 'no-cache' });
  const [, setCookie] = useCookies();
  const [state, setState] = useState({ loggedIn: false });
  const router = useRouter();

  if (data && !loading && !state.loggedIn) {
    setState({ ...state, loggedIn: true });
    setCookie(appConfig.cookies.token, data.userLogin.accessToken);
    setCookie(appConfig.cookies.darkTheme, data.userLogin.darkTheme);
    router.push(appConfig.routes.dashboard);
  }

  if (loggedData) {
    router.push(appConfig.routes.dashboard);
  }

  const submitHandler = (email, password) => {
    userLogin({ variables: { email, password } });
  };

  return <Login onSubmit={submitHandler} badInputs={error !== undefined} loading={loading} />;
};

export default withApollo(LoginIndex);
