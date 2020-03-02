import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import BuildIcon from '@material-ui/icons/Build';
import GroupIcon from '@material-ui/icons/Group';
import LockIcon from '@material-ui/icons/Lock';

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
    icon: <BuildIcon />,
    subList: [
      { label: 'Uživatelé', icon: <GroupIcon />, link: routes.users.index },
      { label: 'Role', icon: <LockIcon />, link: routes.roles.index },
    ],
  },
];

export default listConfig;
