import { ChangedResource, Resource, ResourceCategory, Role } from 'redux/reducers/roles/types';
import rolesActionTypes from 'redux/reducers/roles/actionTypes';

export const rolesChangeResourceCategories = (resourceCategories: ResourceCategory[]) => ({
  type: rolesActionTypes.changeResourceCategories,
  resourceCategories,
});

export const rolesChangeRoles = (roles: Role[]) => ({
  type: rolesActionTypes.changeRoles,
  roles,
});

export const rolesAddChangedResource = (changedResource: ChangedResource) => ({
  type: rolesActionTypes.addChangedResource,
  changedResource,
});

export const rolesClearChangedResources = () => ({
  type: rolesActionTypes.clearChangedResource,
});

export const rolesUpdateResources = (resources: Resource[]) => ({
  type: rolesActionTypes.updateResources,
  resources,
});

export const rolesAddRole = (role: Role) => ({
  type: rolesActionTypes.addRole,
  role,
});

export const rolesRemoveRole = (id: number) => ({
  type: rolesActionTypes.removeRole,
  id,
});
