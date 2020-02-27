import React, { useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import store from 'redux/reducers';
import { storeClear } from 'redux/actions/store';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Content from './Content';
import { PageProps } from './types';
import appConfig from '../../../../shared/config/app';

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

const Page = ({ Component, name, breadcrumbs, ...props }: PageProps) => {
  const classes = useStyles();

  const [, , removeCookies] = useCookies();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handlerLogOut = () => {
    removeCookies(appConfig.cookies.token);
    store.dispatch(storeClear());
    router.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar name={name} drawerOpen={() => setDrawerOpen(true)} onLogOut={handlerLogOut} />
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />

      <Content breadcrumbs={breadcrumbs}>
        <Component {...props} />
      </Content>
    </div>
  );
};

export default Page;
