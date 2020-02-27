import { WithSnackbarProps } from 'notistack';
import {
  RolesReducer,
  Role as RoleRedux,
  Resource as ResourcesRedux,
  ChangedResource,
} from 'redux/reducers/roles/types';

interface Role {
  id: number;
  name: string;
}

interface Resource {
  id: number;
  name: string;
  roles: Role[];
}

export interface ResourceRoleFindAll {
  resourceFindAll: Resource[];
  roleFindAll: Role[];
}

export interface MapState {
  roles: RoleRedux[];
  resources: ResourcesRedux[];
}

export interface MapDispatch {
  rolesChangeRoles: (roles: RoleRedux[]) => void;
  rolesChangeResources: (roles: ResourcesRedux[]) => void;
  rolesAddChangedResource: (changedResource: ChangedResource) => void;
}

export interface RolesIndexProps extends MapState, MapDispatch, WithSnackbarProps {}

export interface RolesProps {
  resources: Resource[];
  roles: Role[];
  onResourceChange: (resourceId: number, roleId: number,active:boolean) => void;
}
