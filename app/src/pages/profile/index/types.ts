interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  createTime: Date;
}

export interface UserGetLogged {
  userGetLogged: User;
}

export interface PreferencesProps {
  loading: boolean;
}
