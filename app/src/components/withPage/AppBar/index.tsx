import React from 'react';
import { AppBar as AppBarPrefab, Theme, Toolbar, Typography, makeStyles } from '@material-ui/core';
import appConfig from '@template/shared/config/app';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const AppBar = () => {
  const classes = useStyles();
  return (
    <AppBarPrefab position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          {appConfig.appName}
        </Typography>
      </Toolbar>
    </AppBarPrefab>
  );
};

export default AppBar;
