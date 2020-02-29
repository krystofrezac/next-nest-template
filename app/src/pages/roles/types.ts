import { WithSnackbarProps } from 'notistack';
import {
  Role as RoleRedux,
  Resource as ResourceRedux,
  ChangedResource,
  ResourceCategory,
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

interface Category {
  id: number;
  name: string;
  resources: Resource[];
}

export interface ResourceRoleFindAll {
  resourceCategoryFindAll: Category[];
  roleFindAll: Role[];
}

export interface MapState {
  roles: RoleRedux[];
  resourceCategories: ResourceCategory[];
  changedResources: ChangedResource[];
}

export interface MapDispatch {
  rolesChangeRoles: (roles: RoleRedux[]) => void;
  rolesChangeResourceCategories: (roles: ResourceCategory[]) => void;
  rolesAddChangedResource: (changedResource: ChangedResource) => void;
  rolesClearChangedResources: () => void;
}

export interface RolesIndexProps extends MapState, MapDispatch, WithSnackbarProps {}

export interface RolesProps {
  resourceCategories: ResourceCategory[];
  roles: RoleRedux[];
  changedResources: ChangedResource[];
  onResourceChange: (resourceId: number, roleId: number, active: boolean) => void;
}
