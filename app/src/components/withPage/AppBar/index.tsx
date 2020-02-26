import React from 'react';
import {
  AppBar as AppBarPrefab,
  Theme,
  Toolbar,
  Typography,
  makeStyles,
  Hidden,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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
        <Hidden mdUp>
          <IconButton onClick={props.drawerOpen} color="inherit" edge="start">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" component="h1" noWrap>
          {props.name}
        </Typography>
      </Toolbar>
    </AppBarPrefab>
  );
};

export default AppBar;
