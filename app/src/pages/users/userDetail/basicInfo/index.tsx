import React from 'react';

import dateFormat from 'dateformat';

import SimpleTable from 'components/table/SimpleTable';
import SimpleRow from 'components/table/SimpeRow';

import { BasicInfoProps } from '../types';

const Index = ({ user }: BasicInfoProps) => {
  const email = user ? user.email : '';
  const name = user ? user.name : '';
  const surname = user ? user.surname : '';
  const date = new Date(user?.createTime || Date.now());
  const formattedDate = dateFormat(date, 'dd.mm.yyyy HH:MM:ss');
  return (
    <>
      <SimpleTable>
        <SimpleRow name="Email">{email}</SimpleRow>
        <SimpleRow name="Jméno">{name}</SimpleRow>
        <SimpleRow name="Příjmení">{surname}</SimpleRow>
        <SimpleRow name="Datum registrace">{formattedDate}</SimpleRow>
      </SimpleTable>
    </>
  );
};

export default Index;
