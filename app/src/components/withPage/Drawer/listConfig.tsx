import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import routes from '@template/shared/config/app/routes';

interface ListConfig {
  label: string;
  icon: JSX.Element;
  link: string;
}

const listConfig: ListConfig[] = [
  { label: 'Přehled', icon: <DashboardIcon />, link: routes.dashboard },
  { label: 'Role', icon: <DashboardIcon />, link: routes.roles },
];

export default listConfig;
