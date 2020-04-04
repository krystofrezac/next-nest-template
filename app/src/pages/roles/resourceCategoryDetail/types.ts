interface Category {
  id: number;
  label: string;
  resources: {
    id: number;
    label: string;
  }[];
}

export interface ResourceCategoryFindById {
  resourceCategoryFindById: Category;
}

export interface ResourceCategoryFindByIdVars {
  id: number;
}

export interface ResourceCategoryDetailProps {
  category: Category;
}
