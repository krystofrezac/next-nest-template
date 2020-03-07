import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { withSnackbar } from 'notistack';

import LoadingButton from 'components/LoadingButton';

import { useRouter } from 'next/router';
import { UserActivateDeactivateProps, UserChangeActive, UserChangeActiveVars } from './types';

const useStyles = makeStyles({
  buttonContainer: {
    display: 'grid',
    justifyItems: 'right',
  },
});
const USER_CHANGE_ACTIVE = gql`
  mutation($userId: Int!) {
    userChangeActive(userId: $userId, active: false) {
      id
      active
    }
  }
`;

const UserDeactivate = (props: UserActivateDeactivateProps) => {
  const classes = useStyles();

  const router = useRouter();
  const [userChangeActive, { loading }] = useMutation<UserChangeActive, UserChangeActiveVars>(
    USER_CHANGE_ACTIVE,
  );

  const submitHandler = () => {
    userChangeActive({ variables: { userId: +router.query.userId } })
      .then(res => {
        if (res.data) {
          props.enqueueSnackbar('Uživatel úspěšně deaktivován', { variant: 'success' });
        }
      })
      .catch(() => {
        props.enqueueSnackbar('Nepovedlo se deaktivovat uživatele', { variant: 'error' });
      });
  };

  return (
    <>
      <Typography variant="h6">Deaktivovat uživatele</Typography>
      <Typography>
        Touto akcí zablokujete uživateli přístup do systému. Všechna jeho historie však zůstane
        zachována. Po této akci jde uživatel znovu aktivovat.
      </Typography>

      <div className={classes.buttonContainer}>
        <LoadingButton
          disabled={!props.active}
          loading={loading}
          color="secondary"
          variant="contained"
          onClick={submitHandler}
        >
          Deaktivovat uživatele
        </LoadingButton>
      </div>
    </>
  );
};

export default withSnackbar(UserDeactivate);
