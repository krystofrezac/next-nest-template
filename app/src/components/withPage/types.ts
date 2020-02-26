import React from 'react';

export interface Breadcrumb {
  label: string;
  route: string;
}

export interface PageProps {
  Component: React.ElementType;
  name: string;
  breadcrumbs: Breadcrumb[];
}
