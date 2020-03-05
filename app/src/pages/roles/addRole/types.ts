import { WithSnackbarProps } from 'notistack';
import { Role } from 'redux/reducers/roles/types';

export interface RoleCreate {
  roleCreate: {
    id: number;
    name: string;
    roles: {
      id: number;
      name: string;
    };
  };
}

export interface RoleCreateVars {
  name: string;
}

export interface MapState {}

export interface MapDispatch {
  addRole: (role: Role) => void;
}

export interface AddRoleProps extends WithSnackbarProps, MapState, MapDispatch {}
