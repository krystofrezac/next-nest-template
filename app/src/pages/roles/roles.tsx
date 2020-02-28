import React from 'react';

import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { RolesProps } from './types';

const Roles = (props: RolesProps) => {
  const resources = [...props.resources];
  const mappedHead = props.roles.map(role => (
    <TableCell key={`headRole${role.id}`}>{role.name}</TableCell>
  ));

  const mappedRows = resources.map(resource => (
    <TableRow key={`row${resource.id}`}>
      <TableCell>{resource.name}</TableCell>
      {props.roles.map(role => {
        const changed = props.changedResources.find(
          ch => ch.resourceId === resource.id && ch.roleId === role.id,
        );
        const checked = resource.roles.find(r => r.id === role.id) !== undefined;
        const changedChecked = changed ? !checked : checked;

        const changeHandler = () => {
          props.onResourceChange(resource.id, role.id, !changedChecked);
        };

        return (
          <TableCell key={`checkbox${role.id}${resource.id}`}>
            <Checkbox checked={changedChecked} onChange={changeHandler} />
          </TableCell>
        );
      })}
    </TableRow>
  ));

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Zdroje</TableCell>
            {mappedHead}
          </TableRow>
        </TableHead>
        <TableBody>{mappedRows}</TableBody>
      </Table>
    </>
  );
};

export default Roles;
