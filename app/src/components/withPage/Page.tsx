import React, { useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import appConfig from '@template/shared/config/app';
import routes from '@template/shared/config/app/routes';

import AppBar from './AppBar';
import Drawer from './Drawer';
import Content from './Content';
import { PageProps } from './types';

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

const Page = ({ user, Component, breadcrumbs, ...props }: PageProps) => {
  const classes = useStyles();

  const [, , removeCookies] = useCookies();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handlerLogOut = () => {
    removeCookies(appConfig.cookies.token);
    router.push(routes.login);
  };

  return (
    <div className={classes.root}>
      <AppBar user={user} drawerOpen={() => setDrawerOpen(true)} onLogOut={handlerLogOut} />
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />

      <Content breadcrumbs={breadcrumbs}>
        <Component {...props} />
      </Content>
    </div>
  );
};

export default Page;
