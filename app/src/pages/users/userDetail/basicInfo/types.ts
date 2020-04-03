import { WithSnackbarProps } from 'notistack';

import { User } from 'pages/users/userDetail/types';

export interface BasicInfoProps extends WithSnackbarProps {
  user: User;
  loading: boolean;
}

export interface FormTypes {
  name: string;
  surname: string;
  email: string;
}

export interface UserEdit {
  userEdit: {
    id: number;
    name: string;
    surname: string;
    email: string;
  };
}

export interface UserEditVars {
  id: number;
  name: string;
  surname: string;
  email: string;
}
