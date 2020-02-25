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
  const { data } = useQuery(USER_GET_LOGGED);
  console.log(data);
  return (
    <>
      <Paper title="Přehled">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam debitis doloribus eum
        excepturi incidunt nesciunt numquam officia porro sed veniam.
      </Paper>
    </>
  );
};

export default withPage(DashboardIndex, 'Přehled', [
  { label: 'Přehled', route: routes.dashboard },
  { label: 'A', route: routes.dashboard },
  { label: 'B', route: routes.dashboard },
]);
