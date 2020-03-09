import React from 'react';

import { useCookies } from 'react-cookie';
import { FormControlLabel } from '@material-ui/core';
import { gql } from 'apollo-boost';

import appConfig from '@template/shared/config/app';

import Paper from 'components/Paper';

import { useMutation } from '@apollo/react-hooks';
import dynamic from 'next/dynamic';
import { PreferencesProps } from './types';

const Switch = dynamic(import('@material-ui/core/Switch'), { ssr: false });

const USER_CHANGE_DARK_THEME = gql`
  mutation($darkTheme: Boolean!) {
    userChangeDarkTheme(darkTheme: $darkTheme) {
      id
      darkTheme
    }
  }
`;

const Preferences = (props: PreferencesProps) => {
  const [cookies, setCookie] = useCookies();
  const [userChangeDarkTheme] = useMutation(USER_CHANGE_DARK_THEME);
  const checked = cookies[appConfig.cookies.theme] === 'true';

  const changeHandler = () => {
    userChangeDarkTheme({ variables: { darkTheme: !checked } }).then(res => {
      if (res.data) {
        setCookie(appConfig.cookies.theme, 'false');
      }
    });
  };

  return (
    <Paper title="Preference" loading={props.loading}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={changeHandler} />}
        label="Temný režim"
      />
    </Paper>
  );
};

export default Preferences;
