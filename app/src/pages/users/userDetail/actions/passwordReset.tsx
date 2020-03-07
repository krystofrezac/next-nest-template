import React, { useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import LoadingButton from 'components/LoadingButton';

import UserLoginDataDialog from 'pages/users/addUser/userLoginDataDialog';

import { withSnackbar, WithSnackbarProps } from 'notistack';
import { UserResetPassword, UserResetPasswordVars } from './types';

const useStyles = makeStyles({
  buttonContainer: {
    display: 'grid',
    justifyItems: 'right',
  },
});

const USER_RESET_PASSWORD = gql`
  mutation($userId: Int!) {
    userResetPassword(userId: $userId) {
      id
      email
      generatedPassword
    }
  }
`;

const PasswordReset = (props: WithSnackbarProps) => {
  const classes = useStyles();

  const router = useRouter();
  const [dialog, setDialog] = useState(false);
  const [userResetPassword, { data, loading }] = useMutation<
    UserResetPassword,
    UserResetPasswordVars
  >(USER_RESET_PASSWORD);

  const clickHandler = () => {
    userResetPassword({ variables: { userId: +router.query.userId } })
      .then(res => {
        if (res.data) {
          props.enqueueSnackbar('Heslo úspěšně vygenerováno', { variant: 'success' });
          setDialog(true);
        }
      })
      .catch(() => {
        props.enqueueSnackbar('Něco se nepovedlo', { variant: 'error' });
      });
  };

  return (
    <>
      <Typography variant="h6">Vygenerovat nové heslo</Typography>
      <Typography>
        Resetuje danému uživateli heslo a vygeneruje mu nové. Staré heslo již nebude možné použít
        pro přihlášení. Používejte jen v případě že uživatel zapomněl heslo. Pokud si chce uživatel
        pouze změnit heslo a pamatuje si staré může tak učinit na stránce profil.
      </Typography>

      <div className={classes.buttonContainer}>
        <LoadingButton loading={loading} color="primary" variant="contained" onClick={clickHandler}>
          Vygenerovat nové heslo
        </LoadingButton>
      </div>
      <UserLoginDataDialog
        open={dialog}
        close={() => {
          setDialog(false);
        }}
        email={data?.userResetPassword.email}
        password={data?.userResetPassword.generatedPassword}
      />
    </>
  );
};

export default withSnackbar(PasswordReset);
