import React from 'react';

import Link from 'next/link';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import routes from '@template/shared/config/app/routes';
import { RolesProps } from './types';

const Roles = (props: RolesProps) => {
  const mappedHead = props.roles.map(role => (
    <TableCell key={`head${role.id}`}>{role.name}</TableCell>
  ));

  const mappedBody = props.resourceCategories.map(category => {
    const categoryResources = category.resources.map(resource => {
      const resourceRoles = props.roles.map(role => {
        const changed = props.changedResources.some(
          ch => ch.resourceId === resource.id && ch.roleId === role.id,
        );
        const active = resource.roles.some(r => r.id === role.id);
        const changedActive = changed ? !active : active;
        const checkboxChangeHandler = () => {
          props.onResourceChange(resource.id, role.id, !changedActive);
        };
        return (
          <TableCell key={`resourceRole${role.id}-${category.id}`} padding="none">
            <Checkbox checked={changedActive} onChange={checkboxChangeHandler} />
          </TableCell>
        );
      });
      return (
        <React.Fragment key={`categoryResource${category.id}-${resource.id}`}>
          <TableRow>
            <TableCell padding="none">
              <Link
                href={{ pathname: routes.roles.resourceDetail, query: { resourceId: resource.id } }}
              >
                <IconButton color="primary">
                  <InfoIcon />
                </IconButton>
              </Link>
              {resource.name}
            </TableCell>
            {resourceRoles}
          </TableRow>
        </React.Fragment>
      );
    });
    const emptyCells = props.roles.map(role => (
      <TableCell key={`categoryEmpty${role.id}-${role.id}`} />
    ));
    return (
      <React.Fragment key={`category${category.id}`}>
        <TableRow>
          <TableCell padding="none">
            <IconButton color="primary">
              <InfoIcon />
            </IconButton>
            <b>{category.name}</b>
          </TableCell>
          {emptyCells}
        </TableRow>
        {categoryResources}
      </React.Fragment>
    );
  });

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Zdroje</TableCell>
            {mappedHead}
          </TableRow>
        </TableHead>
        <TableBody>{mappedBody}</TableBody>
      </Table>
    </>
  );
};

export default Roles;
