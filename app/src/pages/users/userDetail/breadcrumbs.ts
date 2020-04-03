import { Breadcrumb } from 'components/withPage/types';
import usersBreadcrumbs from 'pages/users/index/breadcrumbs';

const userDetailBreadcrumbs: Breadcrumb[] = [...usersBreadcrumbs, { label: 'Detail uživatele' }];

export default userDetailBreadcrumbs;
