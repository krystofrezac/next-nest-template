import { Breadcrumb } from 'components/withPage/types';
import usersBreadcrumbs from 'pages/users/index/breadcrumbs';
import routes from '../../../../../shared/config/app/routes';

const userDetailBreadcrumbs: Breadcrumb[] = [
  ...usersBreadcrumbs,
  { label: 'Detail uživatele', link: routes.users.userDetail },
];

export default userDetailBreadcrumbs;
