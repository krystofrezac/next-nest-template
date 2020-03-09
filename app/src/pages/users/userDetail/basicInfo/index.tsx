import React from 'react';

import dateFormat from 'dateformat';

import SimpleTable from 'components/table/SimpleTable';
import SimpleRow from 'components/table/SimpeRow';

import { BasicInfoProps } from '../types';

const Index = ({ user }: BasicInfoProps) => {
  const email = user ? user.email : '';
  const name = user ? user.name : '';
  const surname = user ? user.surname : '';
  const registerDate = new Date(user?.createTime || Date.now());
  const formattedRegisterDate = dateFormat(registerDate, 'dd.mm.yyyy HH:MM:ss');
  const lastLoginDate = new Date(user?.lastLoginTime || Date.now());
  const formattedLastLoginDate = user?.lastLoginTime
    ? dateFormat(lastLoginDate, 'dd.mm.yyyy HH:MM:ss')
    : '-';

  console.log(user);
  return (
    <>
      <SimpleTable>
        <SimpleRow name="Email">{email}</SimpleRow>
        <SimpleRow name="Jméno">{name}</SimpleRow>
        <SimpleRow name="Příjmení">{surname}</SimpleRow>
        <SimpleRow name="Datum registrace">{formattedRegisterDate}</SimpleRow>
        <SimpleRow name="Poslední přihlášení">{formattedLastLoginDate}</SimpleRow>
        <SimpleRow name="Status">{user?.active ? 'Aktivní' : 'Neaktivní'}</SimpleRow>
      </SimpleTable>
    </>
  );
};

export default Index;
