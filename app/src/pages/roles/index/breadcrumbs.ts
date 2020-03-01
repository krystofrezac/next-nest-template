import routes from '@template/shared/config/app/routes';
import { Breadcrumb } from 'components/withPage/types';

const rolesBreadcrumbs: Breadcrumb[] = [{ label: 'Role', link: routes.roles.index }];

export default rolesBreadcrumbs;
