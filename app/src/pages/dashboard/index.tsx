import React from 'react';

import routes from '@template/shared/config/app/routes';

import withPage from 'components/withPage';
import Paper from 'components/Paper';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const USER_GET_LOGGED = gql`
  {
    userGetLogged {
      id
    }
  }
`;

const DashboardIndex = () => {
  const { data } = useQuery(USER_GET_LOGGED, { fetchPolicy: 'no-cache' });
  return (
    <>
      <Paper title="Přehled">{JSON.stringify(data)}</Paper>
    </>
  );
};

export default withPage(DashboardIndex, 'Přehled', [
  { label: 'Přehled', route: routes.dashboard },
  { label: 'A', route: routes.dashboard },
  { label: 'B', route: routes.dashboard },
]);
