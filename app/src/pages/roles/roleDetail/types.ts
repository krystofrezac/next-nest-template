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

export interface MapState {}

export interface MapDispatch {
  removeRole: (id: number) => void;
}

export interface RoleDetailIndexProps extends WithSnackbarProps, MapState, MapDispatch {}
