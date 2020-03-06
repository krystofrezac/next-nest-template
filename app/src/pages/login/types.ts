import { UserReducer } from 'redux/reducers/user/types';

export interface UserLogin {
  userLogin: {
    id: number;
    accessToken: string;
    name: string;
    surname: string;
    email: string;
    roles: {
      id: number;
      resources: {
        id: number;
        name: string;
      }[];
    }[];
  };
}

export interface LoginProps {
  onSubmit: (email: string, password: string) => void;
  badInputs: boolean;
  loading: boolean;
}

export interface LoginIndexProps {}
