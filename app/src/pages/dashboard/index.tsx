import React from 'react';
import withPage from 'components/withPage';
import routes from '@template/shared/config/app/routes';

const DashboardIndex = () => {
  return <>dashboars</>;
};

export default withPage(DashboardIndex, 'Přehled', [{ label: 'Přehled', route: routes.dashboard }]);
