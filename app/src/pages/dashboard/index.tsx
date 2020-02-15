import React from 'react';
import withPage from 'components/withPage';
import withResources from 'components/withResources';

const DashboardIndex = () => {
  return <>dashboard</>;
};

export default withResources(withPage(DashboardIndex), ['test']);
