interface Resource {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  minimalCount: number;
  requires: {
    id: number;
    name: string;
  }[];
  requiredBy: {
    id: number;
    name: string;
  }[];
  roles: {
    id: number;
    name: string;
  }[];
}

export interface ResourceFindById {
  resourceFindById: Resource;
}

export interface ResourceFindByIdVars {
  id: number;
}

export interface ResourceDetailProps {
  resource: Resource;
}
