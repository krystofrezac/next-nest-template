import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';

import SnackbarProvider from 'lib/notistack';
import theme from 'lib/materialui/theme';

import store from 'redux/reducers';

class MyApp extends App<{ store: any }> {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Template</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <CssBaseline />
              <Component {...pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </Provider>
      </>
    );
  }
}

export default MyApp;
