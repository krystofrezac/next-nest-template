import React from 'react';

import routes from '@template/shared/config/app/routes';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

const DashboardIndex = () => {
  return (
    <>
      <Paper title="Přehled">Přehled</Paper>
    </>
  );
};

export default withPage(DashboardIndex, 'Přehled', [
  { label: 'Přehled', route: routes.dashboard },
  { label: 'A', route: routes.dashboard },
  { label: 'B', route: routes.dashboard },
]);
