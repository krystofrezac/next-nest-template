import React from 'react';

import { Table, TableBody, TableHead } from '@material-ui/core';
import SimpleRow from 'components/table/SimpeRow';

const SimpleTable: React.FC = props => {
  return (
    <Table>
      <TableHead>
        <SimpleRow name="Informace">Hodnota</SimpleRow>
      </TableHead>
      <TableBody>{props.children}</TableBody>
    </Table>
  );
};

export default SimpleTable;
