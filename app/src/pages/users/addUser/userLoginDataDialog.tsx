import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';

import { UserLoginDataModalProps } from './types';

const UserLoginDataDialog = (props: UserLoginDataModalProps) => {
  return (
    <Dialog open={props.open}>
      <DialogTitle>Přihlašovací údaje uživatele</DialogTitle>
      <DialogContent>
        <Typography>{`Email: ${props.email}`}</Typography>
        <Typography>{`Heslo: ${props.password}`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.close}>
          Zavřít
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserLoginDataDialog;
