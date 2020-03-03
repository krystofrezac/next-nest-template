import React from 'react';

import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';
import InfoIcon from '@material-ui/icons/Info';

import MaterialTable from 'lib/materialTable';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import { UserPaginate, UserPaginateVars } from 'pages/users/types';
import usersBreadcrumbs from './breadcrumbs';

const USER_PAGINATE = gql`
  query(
    $limit: Int!
    $offset: Int!
    $email: String
    $name: String
    $surname: String
    $orderBy: OrderByArg
  ) {
    userPaginate {
      items(
        limit: $limit
        offset: $offset
        filter: { email: $email, name: $name, surname: $surname }
        orderBy: $orderBy
      ) {
        id
        name
        surname
        email
      }
      totalCount(filter: { email: $email, name: $name, surname: $surname })
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
          console.log('query', query);
          return new Promise((resolve, reject) => {
            const emailFilter = query.filters.find(f => f.column.field === 'email');
            const nameFilter = query.filters.find(f => f.column.field === 'name');
            const surnameFilter = query.filters.find(f => f.column.field === 'surname');
            const orderBy = query.orderBy
              ? {
                  fieldName: query.orderBy.field.toString(),
                  type: query.orderDirection.toUpperCase(),
                }
              : {
                  fieldName: 'email',
                  type: 'ASC',
                };

            client
              .query<UserPaginate, UserPaginateVars>({
                query: USER_PAGINATE,
                variables: {
                  limit: query.pageSize,
                  offset: query.page * query.pageSize,
                  email: emailFilter ? emailFilter.value : '',
                  name: nameFilter ? nameFilter.value : '',
                  surname: surnameFilter ? surnameFilter.value : '',
                  orderBy,
                },
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
        options={{ filtering: true }}
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
