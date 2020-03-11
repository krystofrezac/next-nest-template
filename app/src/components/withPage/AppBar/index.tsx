import React from 'react';

import {
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
import Link from 'next/link';

import appConfig from '@template/shared/config/app';
import routes from '@template/shared/config/app/routes';

import { useCookies } from 'react-cookie';
import dynamic from 'next/dynamic';
import { AppBarProps } from './types';

const AppBarPrefab = dynamic(import('@material-ui/core/AppBar'), { ssr: false });

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
  link: {
    textDecoration: 'none',
  },
  appBarRootDark: {
    backgroundColor: theme.palette.background.paper,
  },
  white: {
    color: theme.palette.text.primary,
  },
}));

const AppBar = (props: AppBarProps) => {
  const classes = useStyles();

  const [cookies] = useCookies();
  const darkMode = cookies[appConfig.cookies.darkTheme] === 'true';

  return (
    <AppBarPrefab
      position="fixed"
      classes={darkMode ? { root: classes.appBarRootDark } : {}}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton
            className={darkMode ? classes.white : ''}
            onClick={props.drawerOpen}
            color="inherit"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography className={darkMode ? classes.white : ''} variant="h6" component="h1" noWrap>
          Směny
        </Typography>
        <div className={classes.rightIcons}>
          <Link href={routes.profile.index}>
            <a className={classes.link}>
              <Avatar className={classes.avatar} color="secondary">
                {`${props?.user?.name[0] || ''}${props?.user?.surname[0] || ''}`}
              </Avatar>
            </a>
          </Link>
          <IconButton
            className={darkMode ? classes.white : ''}
            color="inherit"
            onClick={props.onLogOut}
          >
            <LogoutIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBarPrefab>
  );
};

export default AppBar;
