import React from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';

import withApollo from 'lib/apollo/withApollo';
import Content from 'components/withPage/Content';
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

const withPage = (
  Component: React.FunctionComponent,
  name: string,
  breadcrumbs: { label: string; route: string }[],
) =>
  withApollo((props: any) => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar />
        <Drawer />

        <Content name={name} breadcrumbs={breadcrumbs}>
          <Component {...props} />
        </Content>
      </div>
    );
  });

export default withPage;
