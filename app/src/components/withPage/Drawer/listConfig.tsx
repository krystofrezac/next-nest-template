import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import BuildIcon from '@material-ui/icons/Build';
import GroupIcon from '@material-ui/icons/Group';
import LockIcon from '@material-ui/icons/Lock';

import routes from '@template/shared/config/app/routes';

import usersResources from 'pages/users/index/resources';
import rolesResources from 'pages/roles/index/resources';

export interface ListConfig {
  label: string;
  icon: JSX.Element;
  link?: string;
  subList?: ListConfig[];
  resources?: string[][];
}

const listConfig: ListConfig[] = [
  { label: 'Přehled', icon: <DashboardIcon />, link: routes.dashboard },
  {
    label: 'Administrace',
    icon: <BuildIcon />,
    resources: [...usersResources, ...rolesResources],
    subList: [
      {
        label: 'Uživatelé',
        icon: <GroupIcon />,
        link: routes.users.index,
        resources: usersResources,
      },
      { label: 'Role', icon: <LockIcon />, link: routes.roles.index, resources: rolesResources },
    ],
  },
];

export default listConfig;
