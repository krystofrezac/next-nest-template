import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withSnackbar } from 'notistack';
import { Button, Typography } from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import { State } from 'redux/reducers/types';
import {
  rolesAddChangedResource,
  rolesChangeResourceCategories,
  rolesChangeRoles,
  rolesClearChangedResources,
  rolesUpdateResources,
} from 'redux/actions/roles';
import { ChangedResource, Resource, ResourceCategory, Role } from 'redux/reducers/roles/types';

import rolesBreadcrumbs from 'pages/roles/index/breadcrumbs';
import {
  ResourceRoleFindAll,
  RolesIndexProps,
  MapDispatch,
  MapState,
  ResourceChangeRoles,
  ResourceChangeRolesVars,
} from './types';
import Roles from './roles';

const RESOURCE_CHANGE_ROLES = gql`
  mutation($changedRoles: [ChangedRoleArg!]!) {
    resourceChangeRoles(changedRoles: $changedRoles) {
      id
      name
      roles {
        id
      }
    }
  }
`;

const RESOURCE_CATEGORY_FIND_ALL = gql`
  {
    resourceCategoryFindAll {
      id
      name
      resources {
        id
        name
        roles {
          id
        }
      }
    }
    roleFindAll {
      id
      name
    }
  }
`;

const RolesIndex = (props: RolesIndexProps) => {
  const { data, error, loading } = useQuery<ResourceRoleFindAll>(RESOURCE_CATEGORY_FIND_ALL);
  const [resourceChangeRoles, { data: mutationData, error: mutationError }] = useMutation<
    ResourceChangeRoles,
    ResourceChangeRolesVars
  >(RESOURCE_CHANGE_ROLES);
  const [saved, setSaved] = useState(false);
  const [mutationSnacked, setMutationSnacked] = useState(false);

  if (error) {
    props.enqueueSnackbar('Něco se pokazilo', { variant: 'error' });
  }

  if (data && !saved) {
    props.rolesChangeResourceCategories(data.resourceCategoryFindAll);
    props.rolesChangeRoles(data.roleFindAll);
    setSaved(true);
  }

  if (mutationData && !mutationSnacked) {
    setMutationSnacked(true);
    props.rolesClearChangedResources();
    props.rolesUpdateResources(mutationData.resourceChangeRoles);
    props.enqueueSnackbar('Role úspěšně aktualizovány', { variant: 'success' });
  } else if (mutationError && !mutationSnacked) {
    setMutationSnacked(true);
    props.enqueueSnackbar('Nepovedlo se aktualizovat role', { variant: 'error' });
  }

  const changeResourceHandler = (resourceId: number, roleId: number, active: boolean) => {
    props.rolesAddChangedResource({ resourceId, roleId, active });
  };
  const cancelHandler = () => {
    props.rolesClearChangedResources();
  };

  const submitHandler = () => {
    setMutationSnacked(false);
    resourceChangeRoles({ variables: { changedRoles: props.changedResources } });
  };

  return (
    <>
      <Paper
        loading={loading}
        title="Role"
        actions={[
          <Button key="actionSave" variant="contained" color="primary" onClick={submitHandler}>
            Uložit
          </Button>,
          <Button key="actionCancel" variant="contained" color="secondary" onClick={cancelHandler}>
            Zrušit
          </Button>,
        ]}
        footer={<Typography>{`Počet změn: ${props.changedResources.length}`}</Typography>}
      >
        <Roles
          resourceCategories={props.resourceCategories}
          roles={props.roles}
          changedResources={props.changedResources}
          onResourceChange={changeResourceHandler}
        />
      </Paper>
    </>
  );
};

const mapStateToProps = (state: State): MapState => ({
  roles: state.roles.roles,
  resourceCategories: state.roles.resourceCategories,
  changedResources: state.roles.changedResources,
});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatch => ({
  rolesChangeRoles: (roles: Role[]) => dispatch(rolesChangeRoles(roles)),
  rolesChangeResourceCategories: (resourceCategories: ResourceCategory[]) =>
    dispatch(rolesChangeResourceCategories(resourceCategories)),
  rolesAddChangedResource: (changedResource: ChangedResource) =>
    dispatch(rolesAddChangedResource(changedResource)),
  rolesClearChangedResources: () => dispatch(rolesClearChangedResources()),
  rolesUpdateResources: (resources: Resource[]) => dispatch(rolesUpdateResources(resources)),
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(RolesIndex)),
  rolesBreadcrumbs,
);
