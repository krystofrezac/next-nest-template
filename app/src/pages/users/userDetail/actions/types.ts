import { WithSnackbarProps } from 'notistack';

export interface UserResetPassword {
  userResetPassword: {
    id: number;
    email: string;
    generatedPassword: string;
  };
}

export interface UserResetPasswordVars {
  userId: number;
}

export interface UserChangeActive {
  userChangeActive: {
    id: number;
    active: boolean;
  };
}

export interface UserChangeActiveVars {
  userId: number;
}

export interface UserFindById {
  userFindById: {
    id: number;
    active: boolean;
  };
}

export interface UserFindByIdVars {
  userId: number;
}

export interface UserActivateDeactivateProps extends WithSnackbarProps {
  active: boolean;
}
