import React from 'react';
import { AppBar as AppBarPrefab, Theme, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { AppBarProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const AppBar = (props: AppBarProps) => {
  const classes = useStyles();
  return (
    <AppBarPrefab position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" component="h1" noWrap>
          {props.name}
        </Typography>
      </Toolbar>
    </AppBarPrefab>
  );
};

export default AppBar;
