import React from 'react';

import { Button, Theme, makeStyles } from '@material-ui/core';

import SimpleTable from 'components/table/SimpleTable';
import SimpleRow from 'components/table/SimpeRow';

import { BasicInfoProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    paddingTop: theme.spacing(2),
    display: 'grid',
    justifyItems: 'end',
    gridTemplateColumns: '1fr auto',
    gridGap: theme.spacing(2),
  },
  action: {
    display: 'table',
  },
}));

const BasicInfo = ({ user }: BasicInfoProps) => {
  const classes = useStyles({});

  const email = user ? user.email : '';
  const name = user ? user.name : '';
  const surname = user ? user.surname : '';

  return (
    <>
      <SimpleTable>
        <SimpleRow name="Email">{email}</SimpleRow>
        <SimpleRow name="Jméno">{name}</SimpleRow>
        <SimpleRow name="Příjmení">{surname}</SimpleRow>
      </SimpleTable>
      <div className={classes.actions}>
        <div className={classes.action}>
          <Button key="actionGeneratePassword" color="primary" variant="contained">
            Vygenerovat nové heslo
          </Button>
        </div>
        <div className={classes.action}>
          <Button key="actionDelete" color="secondary" variant="contained">
            Smazat uživatele
          </Button>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
