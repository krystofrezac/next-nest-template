import React from 'react';

export interface RouterPageProps {
  redirect: (name: string, query?: any) => void;
  query: any;
}

export interface PageRouterProps {
  pages: {
    name: string;
    component: React.ComponentType<RouterPageProps>;
    default?: boolean;
    props?: any;
  }[];
  onPageChange: (page: string) => void;
}
