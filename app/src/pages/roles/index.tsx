import React, { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import { State } from 'redux/reducers/types';
import {
  rolesAddChangedResource,
  rolesChangeResources,
  rolesChangeRoles,
} from 'redux/actions/roles';
import { ChangedResource, Resource, Role } from 'redux/reducers/roles/types';

import { ResourceRoleFindAll, RolesIndexProps, MapDispatch, MapState } from './types';
import Roles from './roles';

const RESOURCE_ROLE_FIND_ALL = gql`
  {
    resourceFindAll {
      id
      name
      roles {
        id
        name
      }
    }
    roleFindAll {
      id
      name
    }
  }
`;

const RolesIndex = (props: RolesIndexProps) => {
  const { data, error, loading } = useQuery<ResourceRoleFindAll>(RESOURCE_ROLE_FIND_ALL);
  const [saved, setSaved] = useState(false);

  if (error) {
    props.enqueueSnackbar('Něco se pokazilo', { variant: 'error' });
  }

  if (data && !saved) {
    props.rolesChangeResources(data.resourceFindAll);
    props.rolesChangeRoles(data.roleFindAll);
    setSaved(true);
  }

  const changeResourceHandler = (resourceId: number, roleId: number, active: boolean) => {
    props.rolesAddChangedResource({ resourceId, roleId, active });
  };

  console.log('props', props);

  return (
    <>
      <Paper
        loading={loading}
        title="Role"
        actions={[
          <Button key="saveButton" variant="contained" color="primary">
            Uložit
          </Button>,
          <Button key="cancelButton" variant="contained" color="secondary">
            Zrušit
          </Button>,
        ]}
      >
        <Roles
          resources={props.resources}
          roles={props.roles}
          onResourceChange={changeResourceHandler}
        />
      </Paper>
    </>
  );
};

const mapStateToProps = (state: State): MapState => ({
  roles: state.roles.roles,
  resources: state.roles.resources,
});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatch => ({
  rolesChangeRoles: (roles: Role[]) => dispatch(rolesChangeRoles(roles)),
  rolesChangeResources: (resources: Resource[]) => dispatch(rolesChangeResources(resources)),
  rolesAddChangedResource: (changedResource: ChangedResource) =>
    dispatch(rolesAddChangedResource(changedResource)),
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(RolesIndex)),
  'Role',
  [{ label: 'Role', link: '/roles' }],
);
