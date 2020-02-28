import { WithSnackbarProps } from 'notistack';
import {
  Role as RoleRedux,
  Resource as ResourceRedux,
  ChangedResource,
} from 'redux/reducers/roles/types';

interface Role {
  id: number;
  name: string;
}

interface Resource {
  id: number;
  name: string;
  roles: { id: number }[];
}

export interface ResourceRoleFindAll {
  resourceFindAll: Resource[];
  roleFindAll: Role[];
}

export interface MapState {
  roles: RoleRedux[];
  resources: ResourceRedux[];
  changedResources: ChangedResource[];
}

export interface MapDispatch {
  rolesChangeRoles: (roles: RoleRedux[]) => void;
  rolesChangeResources: (roles: ResourceRedux[]) => void;
  rolesAddChangedResource: (changedResource: ChangedResource) => void;
}

export interface RolesIndexProps extends MapState, MapDispatch, WithSnackbarProps {}

export interface RolesProps {
  resources: ResourceRedux[];
  roles: RoleRedux[];
  changedResources: ChangedResource[];
  onResourceChange: (resourceId: number, roleId: number, active: boolean) => void;
}
