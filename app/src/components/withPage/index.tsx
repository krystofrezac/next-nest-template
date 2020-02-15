import React from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';

import withApollo from 'lib/apollo/withApollo';
import AppBar from './AppBar';
import Drawer from './Drawer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const withPage = (Component: React.FunctionComponent) =>
  withApollo((props: any) => {
    const classes = useStyles({});

    return (
      <div className={classes.root}>
        <AppBar />
        <Drawer />

        <div className={classes.content}>
          <div className={classes.toolbar}>a</div>
          <Component {...props} />
        </div>
      </div>
    );
  });

export default withPage;
