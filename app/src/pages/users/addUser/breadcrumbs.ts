import routes from '@template/shared/config/app/routes';

import { Breadcrumb } from 'components/withPage/types';

import usersBreadcrumbs from 'pages/users/index/breadcrumbs';

const addUserBreadcrumbs: Breadcrumb[] = [
  ...usersBreadcrumbs,
  { label: 'Přidání uživatele', link: routes.users.addUser },
];

export default addUserBreadcrumbs;
