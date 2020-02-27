import React from 'react';
import { SnackbarProvider } from 'notistack';

import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  // @ts-ignore
  notistackRef.current.closeSnackbar(key);
};

const Index = props => (
  <SnackbarProvider
    maxSnack={3}
    autoHideDuration={5000}
    {...props}
    ref={notistackRef}
    action={key => (
      <IconButton onClick={onClickDismiss(key)}>
        <CloseIcon />
      </IconButton>
    )}
  />
);

export default Index;
