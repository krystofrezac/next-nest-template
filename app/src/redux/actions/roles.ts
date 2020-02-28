import { ChangedResource, Resource, Role } from 'redux/reducers/roles/types';

export const rolesChangeResources = (resources: Resource[]) => ({
  type: 'ROLES_CHANGE_RESOURCES',
  resources,
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
