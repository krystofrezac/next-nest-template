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
export interface ResourceCategory {
  id: number;
  name: string;
  resources: Resource[];
}

export interface RolesReducer {
  resourceCategories: ResourceCategory[];
  roles: Role[];
  changedResources: ChangedResource[];
}
