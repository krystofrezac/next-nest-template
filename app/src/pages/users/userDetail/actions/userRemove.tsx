import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import LoadingButton from 'components/LoadingButton';

const useStyles = makeStyles({
  buttonContainer: {
    display: 'grid',
    justifyItems: 'right',
  },
});

const UserRemove = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6">Odstranit uživatele</Typography>
      <Typography>
        Touto akcí zablokujete uživateli přístup do systému. Všechna jeho historie však zůstane
        zachována. Po této akci jde uživatel znovu zaregistrovat.
      </Typography>

      <div className={classes.buttonContainer}>
        <LoadingButton color="secondary" variant="contained">
          Odstranit uživatele
        </LoadingButton>
      </div>
    </>
  );
};

export default UserRemove;
