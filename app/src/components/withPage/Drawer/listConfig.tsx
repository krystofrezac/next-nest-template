import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';

import routes from '@template/shared/config/app/routes';

export interface ListConfig {
  label: string;
  icon: JSX.Element;
  link?: string;
  subList?: ListConfig[];
}

const listConfig: ListConfig[] = [
  { label: 'Přehled', icon: <DashboardIcon />, link: routes.dashboard },
  {
    label: 'Administrace',
    icon: <DashboardIcon />,
    subList: [
      { label: 'Uživatelé', icon: <DashboardIcon />, link: routes.users.index },
      { label: 'Role', icon: <DashboardIcon />, link: routes.roles.index },
    ],
  },
];

export default listConfig;
