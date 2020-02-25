import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import withApollo from 'lib/apollo/withApollo';

import Content from 'components/withPage/Content';

import cookies from 'next-cookies';
import AppBar from './AppBar';
import Drawer from './Drawer';
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

const withPage = (
  Component: React.FunctionComponent,
  name: string,
  breadcrumbs: { label: string; route: string }[],
) => {
  const WithPage = (p: any) => {
    console.log('token', p.token);
    const WithPageApollo = withApollo(props => {
      const classes = useStyles();
      return (
        <div className={classes.root}>
          <AppBar name={name} />
          <Drawer />

          <Content breadcrumbs={breadcrumbs}>
            <Component {...props} />
          </Content>
        </div>
      );
    }, p.token);

    return <WithPageApollo {...p} />;
  };

  WithPage.getInitialProps = ctx => {
    return { token: cookies(ctx)[appConfig.cookies.token] };
  };
  return WithPage;
};

export default withPage;
