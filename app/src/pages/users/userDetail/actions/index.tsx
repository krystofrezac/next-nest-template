import React from 'react';

import { Theme, makeStyles, Grid, Divider } from '@material-ui/core';

import UserRemove from './userRemove';
import PasswordReset from './passwordReset';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

const Actions = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PasswordReset />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <UserRemove />
        </Grid>
      </Grid>
    </div>
  );
};

export default Actions;
