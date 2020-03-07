import routes from '@template/shared/config/app/routes';

import { Breadcrumb } from 'components/withPage/types';

import profileBreadcrumbs from 'pages/profile/index/breadcrumbs';

const changePasswordBreadcrumbs: Breadcrumb[] = [
  ...profileBreadcrumbs,
  { label: 'Změna hesla', link: routes.profile.changePassword },
];

export default changePasswordBreadcrumbs;
