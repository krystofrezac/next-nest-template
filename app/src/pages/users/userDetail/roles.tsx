import React, { useState } from 'react';

import { Button, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { withSnackbar } from 'notistack';
import { useRouter } from 'next/router';

import MaterialTable from 'lib/materialTable';

import roleFragment from './roleFragment';
import { Role, RoleFindAll, RolesProps, UserChangeRoles, UserChangeRolesVars } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    paddingTop: theme.spacing(2),
    display: 'grid',
    justifyItems: 'end',
    gridTemplateColumns: '1fr auto',
  },
  action: {
    display: 'table',
    marginLeft: theme.spacing(2),
  },
}));

const ROLE_FIND_ALL = gql`
  {
    roleFindAll {
      id
      name
    }
  }
`;

const USER_CHANGE_ROLES = gql`
  ${roleFragment}
  mutation($userId: Int!, $rolesIds: [Int!]!) {
    userChangeRoles(userId: $userId, rolesIds: $rolesIds) {
      id
      ...Roles
    }
  }
`;

const Roles = (props: RolesProps) => {
  const classes = useStyles();

  const router = useRouter();
  const { data, loading } = useQuery<RoleFindAll>(ROLE_FIND_ALL);
  const [userChangeRoles] = useMutation<UserChangeRoles, UserChangeRolesVars>(USER_CHANGE_ROLES);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<Role[]>(props.roles);

  const submitHandler = () => {
    const rolesIds = selected.map(s => s.id);
    userChangeRoles({
      variables: { userId: +router.query.userId, rolesIds },
    }).then(res => {
      if (res.data) {
        props.enqueueSnackbar('Role úspěšně změněny', { variant: 'success' });
        setEditing(false);
      }
      if (res.errors) {
        props.enqueueSnackbar('Něco se pokazilo', { variant: 'error' });
      }
    });
  };

  const fetchedRoles = data
    ? data.roleFindAll.map(role => {
        const checked = selected.some(r => r.id === role.id);
        return {
          tableData: { checked },
          ...role,
        };
      })
    : [];

  return (
    <>
      <MaterialTable
        isLoading={loading}
        columns={[{ title: 'Název', field: 'name' }]}
        data={!editing ? props.roles : fetchedRoles}
        options={{ selection: editing }}
        onSelectionChange={d => {
          setSelected(d);
        }}
      />
      <div className={classes.actions}>
        {!editing ? (
          <div className={classes.action}>
            <Button color="primary" variant="contained" onClick={() => setEditing(true)}>
              Změnit role
            </Button>
          </div>
        ) : (
          <>
            <div className={classes.action}>
              <Button color="primary" variant="contained" onClick={submitHandler}>
                Uložit
              </Button>
            </div>
            <div className={classes.action}>
              <Button color="secondary" variant="contained" onClick={() => setEditing(false)}>
                Zrušit
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default withSnackbar(Roles);
