import { Breadcrumb } from 'components/withPage/types';

import routes from '@template/shared/config/app/routes';

const usersBreadcrumbs: Breadcrumb[] = [{ label: 'Uživatelé', link: routes.users.index }];

export default usersBreadcrumbs;
