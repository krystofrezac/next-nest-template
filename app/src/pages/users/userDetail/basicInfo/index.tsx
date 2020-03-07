import React from 'react';

import SimpleTable from 'components/table/SimpleTable';
import SimpleRow from 'components/table/SimpeRow';

import { BasicInfoProps } from '../types';

const Index = ({ user }: BasicInfoProps) => {
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
    </>
  );
};

export default Index;
