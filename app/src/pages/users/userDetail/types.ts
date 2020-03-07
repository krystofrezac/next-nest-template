import { WithSnackbarProps } from 'notistack';

export interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  createTime: Date;
  roles: Role[];
  active: boolean;
}

export interface UserFindById {
  userFindById: User;
}

export interface UserFindByIdVars {
  id: number;
}

export interface UserChangeRoles {
  userChangeRoles: {
    id: number;
    roles: Role[];
  };
}

export interface UserChangeRolesVars {
  userId: number;
  rolesIds: number[];
}

export interface RoleFindAll {
  roleFindAll: Role[];
}

export interface BasicInfoProps {
  user: User;
}

export interface RolesProps extends WithSnackbarProps {
  roles: Role[];
}
