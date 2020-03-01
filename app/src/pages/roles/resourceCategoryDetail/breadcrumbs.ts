import { Breadcrumb } from 'components/withPage/types';
import rolesBreadcrumbs from 'pages/roles/index/breadcrumbs';

const resourceCategoryDetailBreadcrumbs: Breadcrumb[] = [
  ...rolesBreadcrumbs,
  { label: 'Detail kategorie' },
];

export default resourceCategoryDetailBreadcrumbs;
