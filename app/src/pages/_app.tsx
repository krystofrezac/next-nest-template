import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider as ThemeProviderPrefab } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';

import SnackbarProvider from 'lib/notistack';
import theme, { darkTheme } from 'lib/materialui/theme';

import store from 'redux/reducers';

const ThemProvider = (props: any) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return <ThemeProviderPrefab theme={prefersDarkMode ? darkTheme : theme} {...props} />;
};

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
          <ThemProvider>
            <SnackbarProvider>
              <CssBaseline />
              <Component {...pageProps} />
            </SnackbarProvider>
          </ThemProvider>
        </Provider>
      </>
    );
  }
}

export default MyApp;
