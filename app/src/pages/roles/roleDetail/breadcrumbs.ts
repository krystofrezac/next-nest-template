import { Breadcrumb } from 'components/withPage/types';
import rolesBreadcrumbs from 'pages/roles/index/breadcrumbs';

const roleDetailBreadcrumbs: Breadcrumb[] = [...rolesBreadcrumbs, { label: 'Detail zdroje' }];

export default roleDetailBreadcrumbs;
