import { WithSnackbarProps } from 'notistack';

export interface RoleCreate {
  roleCreate: {
    id: number;
    roles: {
      id: number;
      name: string;
    };
  };
}

export interface RoleCreateVars {
  name: string;
}

export interface AddRoleProps extends WithSnackbarProps {}
