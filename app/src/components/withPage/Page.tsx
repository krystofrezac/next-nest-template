import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
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

const Page = ({ Component, ...props }: PageProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar name={props.name} drawerOpen={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />

      <Content breadcrumbs={props.breadcrumbs}>
        <Component {...props} />
      </Content>
    </div>
  );
};

export default Page;
