export interface UserGetLogged {
  userGetLogged: {
    roles: {
      id: number;

      resources: {
        id: number;
        name: string;
      }[];
    }[];
  };
}
