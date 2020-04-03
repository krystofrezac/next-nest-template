export interface FormTypes {
  name: string;
  maxUsers: string;
}

export interface RoleEdit {
  roleEdit: {
    id: number;
    name: string;
    maxUsers: number;
  };
}

export interface RoleEditVars {
  roleId: number;
  name: string;
  maxUsers: number;
}
