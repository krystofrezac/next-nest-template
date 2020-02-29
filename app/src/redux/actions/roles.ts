import { ChangedResource, ResourceCategory, Role } from 'redux/reducers/roles/types';

export const rolesChangeResourceCategories = (resourceCategories: ResourceCategory[]) => ({
  type: 'ROLES_CHANGE_RESOURCE_CATEGORIES',
  resourceCategories,
});

export const rolesChangeRoles = (roles: Role[]) => ({
  type: 'ROLES_CHANGE_ROLES',
  roles,
});

export const rolesAddChangedResource = (changedResource: ChangedResource) => ({
  type: 'ROLE_ADD_CHANGED_RESOURCE',
  changedResource,
});

export const rolesClearChangedResources = () => ({
  type: 'ROLE_CLEAR_CHANGED_RESOURCES',
});
