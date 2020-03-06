import React from 'react';

import routes from '@template/shared/config/app/routes';

import withPage from 'components/withPage';

import Dashboard from './dashboard';

const DashboardIndex = () => {
  return <Dashboard />;
};

export default withPage(DashboardIndex, [{ label: 'Přehled', link: routes.dashboard }]);
