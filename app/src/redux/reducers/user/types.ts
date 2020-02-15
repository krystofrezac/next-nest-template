export interface Role {
  id: number;
  resources: {
    id: number;
    name: string;
  }[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  roles: Role[];
}
