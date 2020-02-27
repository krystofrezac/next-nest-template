import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';

import appConfig from '@template/shared/config/app';

import withApollo from 'lib/apollo/withApollo';

import { UserReducer } from 'redux/reducers/user/types';
import { userChange } from 'redux/actions/user';

import { useRouter } from 'next/router';
import { LoginIndexProps, MapDispatch, MapState, UserLogin } from './types';
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
    }
  }
`;

const LoginIndex = (props: LoginIndexProps) => {
  const [userLogin, { loading, data, error }] = useLazyQuery<UserLogin>(USER_LOGIN);
  const [getCookies, setCookie] = useCookies();
  const [state, setState] = useState({ loggedIn: false });
  const router = useRouter();

  if (data && !loading && !state.loggedIn) {
    props.changeUser(data.userLogin);
    setCookie(appConfig.cookies.token, data.userLogin.accessToken);
    setState({ ...state, loggedIn: true });
  }

  if (getCookies[appConfig.cookies.token]) {
    router.push(appConfig.routes.dashboard);
  }

  const submitHandler = (email, password) => {
    userLogin({ variables: { email, password } });
  };

  return <Login onSubmit={submitHandler} badInputs={error !== undefined} loading={loading} />;
};

const mapStateToProps = (): MapState => ({});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatch => ({
  changeUser: (user: UserReducer) => dispatch(userChange(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(LoginIndex));
