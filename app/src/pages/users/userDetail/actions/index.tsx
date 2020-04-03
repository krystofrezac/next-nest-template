import React from 'react';

import { Theme, makeStyles, Grid, Divider } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

import { useRouter } from 'next/router';
import UserActivate from './userActivate';
import UserDeactivate from './userDeactivate';
import PasswordReset from './passwordReset';
import { UserFindById, UserFindByIdVars } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

const USER_FIND_BY_ID = gql`
  query($userId: Int!) {
    userFindById(id: $userId) {
      id
      active
    }
  }
`;

const Actions = () => {
  const classes = useStyles();

  const router = useRouter();
  const [userFindById, { data, error, loading }] = useLazyQuery<UserFindById, UserFindByIdVars>(
    USER_FIND_BY_ID,
  );

  if (router.query.userId && !data && !error && !loading) {
    userFindById({ variables: { userId: +router.query.userId } });
  }

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PasswordReset />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <UserDeactivate active={data?.userFindById.active} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <UserActivate active={data?.userFindById.active} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Actions;
