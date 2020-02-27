export interface Role {
  id: number;
  resources: {
    id: number;
    name: string;
  }[];
}

export interface UserReducer {
  id: number;
  email: string;
  name: string;
  surname: string;
  roles: Role[];
}
