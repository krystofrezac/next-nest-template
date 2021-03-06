import React from 'react';

import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import InfoIcon from '@material-ui/icons/Info';
import Link from 'next/link';

import routes from '@template/shared/config/app/routes';
import resources from '@template/shared/config/api/resources';

import MaterialTable from 'lib/materialTable';

import withPage from 'components/withPage';
import Paper from 'components/Paper';
import useResources from 'components/resources/useResources';

import { UserPaginate, UserPaginateVars } from './types';

import usersResources from './resources';
import usersBreadcrumbs from './breadcrumbs';

const USER_PAGINATE = gql`
  query($limit: Int!, $offset: Int!, $filter: UserFilterArg, $orderBy: OrderByArg) {
    userPaginate {
      items(limit: $limit, offset: $offset, filter: $filter, orderBy: $orderBy) {
        id
        name
        surname
        email
        active
      }
      totalCount(filter: $filter)
    }
  }
`;

const Info = () => <InfoIcon color="primary" />;

const UsersIndex = () => {
  const client = useApolloClient();
  const router = useRouter();

  const canAdd = useResources([[resources.user.add]]);
  const canSeeAll = useResources([[resources.user.seeAll]]);

  return (
    <Paper
      title="Uživatelé"
      actions={[
        canAdd && (
          <Link key="actionAdd" href={routes.users.addUser}>
            <Button color="primary" variant="contained">
              Přidat uživatele
            </Button>
          </Link>
        ),
      ]}
    >
      {canSeeAll && (
        <MaterialTable
          data={query => {
            return new Promise((resolve, reject) => {
              const emailFilter = query.filters.find(f => f.column.field === 'email');
              const nameFilter = query.filters.find(f => f.column.field === 'name');
              const surnameFilter = query.filters.find(f => f.column.field === 'surname');
              const activeFilter = query.filters.find(f => f.column.field === 'active');
              const filter = {
                email: emailFilter ? emailFilter.value : '',
                name: nameFilter ? nameFilter.value : '',
                surname: surnameFilter ? surnameFilter.value : '',
                active: activeFilter ? activeFilter.value.map(a => a === 'true') : [],
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
                  fetchPolicy: 'no-cache',
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
            {
              title: 'Status',
              field: 'active',
              render: data => (data.active ? 'Aktivní' : 'Neaktivní'),
              lookup: { true: 'Aktivní', false: 'Neaktivní' },
            },
          ]}
        />
      )}
    </Paper>
  );
};

export default withPage(UsersIndex, usersBreadcrumbs, usersResources);
