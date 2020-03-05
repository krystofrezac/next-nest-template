import React from 'react';

import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';
import InfoIcon from '@material-ui/icons/Info';

import MaterialTable from 'lib/materialTable';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import { UserPaginate, UserPaginateVars } from 'pages/users/index/types';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import usersBreadcrumbs from './breadcrumbs';
import routes from '../../../../../shared/config/app/routes';

const USER_PAGINATE = gql`
  query($limit: Int!, $offset: Int!, $filter: UserFilterArg, $orderBy: OrderByArg) {
    userPaginate {
      items(limit: $limit, offset: $offset, filter: $filter, orderBy: $orderBy) {
        id
        name
        surname
        email
      }
      totalCount(filter: $filter)
    }
  }
`;

const Info = () => <InfoIcon color="primary" />;

const UsersIndex = () => {
  const client = useApolloClient();
  const router = useRouter();

  return (
    <Paper
      title="Uživatelé"
      actions={[
        <Button key="actionAdd" color="primary" variant="contained">
          Přidat uživatele
        </Button>,
      ]}
    >
      <MaterialTable
        data={query => {
          return new Promise((resolve, reject) => {
            const emailFilter = query.filters.find(f => f.column.field === 'email');
            const nameFilter = query.filters.find(f => f.column.field === 'name');
            const surnameFilter = query.filters.find(f => f.column.field === 'surname');
            const filter = {
              email: emailFilter ? emailFilter.value : '',
              name: nameFilter ? nameFilter.value : '',
              surname: surnameFilter ? surnameFilter.value : '',
            };
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
                  filter,
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
            onClick: (e, rowData) => {
              router.push({ pathname: routes.users.userDetail, query: { userId: rowData.id } });
            },
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