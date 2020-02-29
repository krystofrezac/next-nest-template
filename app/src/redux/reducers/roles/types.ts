export interface Role {
  id: number;
  name: string;
}

export interface Resource {
  id: number;
  name: string;
  roles: { id: number }[];
}

export interface ChangedResource {
  resourceId: number;
  roleId: number;
  active: boolean;
}

export interface RolesReducer {
  resources: Resource[];
  roles: Role[];
  changedResources: ChangedResource[];
}