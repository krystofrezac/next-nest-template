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
    userChangeActive(userId: $userId, active: true) {
      id
      active
    }
  }
`;

const UserActivate = (props: UserActivateDeactivateProps) => {
  const classes = useStyles();

  const router = useRouter();
  const [userChangeActive, { loading }] = useMutation<UserChangeActive, UserChangeActiveVars>(
    USER_CHANGE_ACTIVE,
  );

  const submitHandler = () => {
    userChangeActive({ variables: { userId: +router.query.userId } })
      .then(res => {
        if (res.data) {
          props.enqueueSnackbar('Uživatel úspěšně aktivován', { variant: 'success' });
        }
      })
      .catch(() => {
        props.enqueueSnackbar('Nepovedlo se aktivovat uživatele', { variant: 'error' });
      });
  };

  return (
    <>
      <Typography variant="h6">Aktivovat uživatele</Typography>
      <Typography>Touto akcí obnovíte uživateli přístup do systému.</Typography>

      <div className={classes.buttonContainer}>
        <LoadingButton
          disabled={props.active}
          loading={loading}
          color="primary"
          variant="contained"
          onClick={submitHandler}
        >
          Aktivovat uživatele
        </LoadingButton>
      </div>
    </>
  );
};

export default withSnackbar(UserActivate);
