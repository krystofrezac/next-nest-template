import React from 'react';

import withPage from 'components/withPage';

import Users from './users';
import usersBreadcrumbs from './breadcrumbs';

const UsersIndex = () => {
  return <Users />;
};

export default withPage(UsersIndex, usersBreadcrumbs);
