import React from 'react';

import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';
import InfoIcon from '@material-ui/icons/Info';

import MaterialTable from 'lib/materialTable';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import usersBreadcrumbs from './breadcrumbs';

const USER_PAGINATE = gql`
  query($limit: Int!, $offset: Int!) {
    userPaginate {
      items(limit: $limit, offset: $offset) {
        id
        name
        surname
        email
      }
      totalCount
    }
  }
`;

const Info = () => <InfoIcon color="primary" />;

const UsersIndex = () => {
  const client = useApolloClient();
  return (
    <Paper title="Uživatelé">
      <MaterialTable
        data={query => {
          return new Promise((resolve, reject) => {
            client
              .query({
                query: USER_PAGINATE,
                variables: { limit: query.pageSize, offset: query.page * query.pageSize },
              })
              .then(res => {
                if (res.data) {
                  resolve({
                    data: res.data.userPaginate.items,
                    page: query.page,
                    totalCount: res.data.userPaginate.totalCount,
                  });
                } else {
                  reject();
                }
              });
          });
        }}
        actions={[
          {
            icon: Info,
            iconProps: { color: 'error' },
            tooltip: 'Detail',
            onClick: () => {},
          },
        ]}
        columns={[
          { title: 'Email', field: 'email' },
          { title: 'Jméno', field: 'name' },
          { title: 'Příjmení', field: 'surname' },
        ]}
      />
    </Paper>
  );
};

export default withPage(UsersIndex, usersBreadcrumbs);
