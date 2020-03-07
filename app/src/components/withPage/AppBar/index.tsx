import React from 'react';

import {
  AppBar as AppBarPrefab,
  Theme,
  Toolbar,
  Typography,
  makeStyles,
  Hidden,
  IconButton,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import { AppBarProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: 'grid',
    gridGap: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr auto',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'auto 1fr auto',
    },
  },
  rightIcons: {
    justifySelf: 'end',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
  },
  avatar: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AppBar = (props: AppBarProps) => {
  const classes = useStyles();
  return (
    <AppBarPrefab position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton onClick={props.drawerOpen} color="inherit" edge="start">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" component="h1" noWrap>
          Název aplikace
        </Typography>
        <div className={classes.rightIcons}>
          <Avatar className={classes.avatar} color="secondary">
            {`${props?.user?.name[0] || ''}${props?.user?.surname[0] || ''}`}
          </Avatar>
          <IconButton color="inherit" onClick={props.onLogOut}>
            <LogoutIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBarPrefab>
  );
};

export default AppBar;
