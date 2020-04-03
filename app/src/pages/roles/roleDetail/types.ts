import { WithSnackbarProps } from 'notistack';

interface Role {
  id: number;
  name: string;
  maxUsers: number;
  userCount: number;
}

export interface RoleFindById {
  roleFindById: Role;
}

export interface RoleFindByIdVars {
  id: number;
}

export interface MapState {}

export interface MapDispatch {
  removeRole: (id: number) => void;
}

export interface BasicInfoProps extends WithSnackbarProps {
  role: Role;
  loading: boolean;
}
