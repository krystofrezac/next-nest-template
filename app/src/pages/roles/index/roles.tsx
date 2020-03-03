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
  Tooltip,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/AddCircle';

import routes from '@template/shared/config/app/routes';
import { RolesProps } from './types';

const Roles = (props: RolesProps) => {
  const DetailTooltip: React.FC = (p: { children: JSX.Element }) => (
    <Tooltip title="Detail" arrow>
      {p.children}
    </Tooltip>
  );

  const mappedHead = props.roles.map(role => (
    <TableCell key={`head${role.id}`} padding="none">
      <Link href={{ pathname: routes.roles.roleDetail, query: { roleId: role.id } }}>
        <a>
          <DetailTooltip>
            <IconButton color="primary">
              <InfoIcon />
            </IconButton>
          </DetailTooltip>
        </a>
      </Link>
      {role.name}
    </TableCell>
  ));

  const mappedBody = props.resourceCategories.map(category => {
    const categoryResources = category.resources.map(resource => {
      const resourceRoles = [...props.roles, { id: -1, name: '' }].map(role => {
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
            <Checkbox
              checked={changedActive}
              disabled={role.id < 0}
              onChange={checkboxChangeHandler}
            />
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
                <a>
                  <DetailTooltip>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </DetailTooltip>
                </a>
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
            <Link
              href={{
                pathname: routes.roles.resourceCategoryDetail,
                query: { categoryId: category.id },
              }}
            >
              <a>
                <DetailTooltip>
                  <IconButton color="primary">
                    <InfoIcon />
                  </IconButton>
                </DetailTooltip>
              </a>
            </Link>
            <b>{category.name}</b>
          </TableCell>
          {emptyCells}
          <TableCell />
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
            <TableCell padding="none">
              <Link href={routes.roles.addRole}>
                <a>
                  <Tooltip title="Přidat roli" arrow>
                    <IconButton color="primary">
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </a>
              </Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{mappedBody}</TableBody>
      </Table>
    </>
  );
};

export default Roles;
