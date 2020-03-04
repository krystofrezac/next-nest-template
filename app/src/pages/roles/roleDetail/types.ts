import { WithSnackbarProps } from 'notistack';

export interface RoleFindById {
  roleFindById: {
    id: number;
    name: string;
  };
}

export interface RoleFindByIdVars {
  id: number;
}

export interface RoleDetailIndexProps extends WithSnackbarProps {}
