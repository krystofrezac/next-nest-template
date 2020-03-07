import React from 'react';

import InfoIcon from '@material-ui/icons/Info';
import { useRouter } from 'next/router';

import { UsersProps } from 'pages/roles/roleDetail/users/types';
import MaterialTable from 'lib/materialTable';
import routes from '@template/shared/config/app/routes';

const Info = () => <InfoIcon color="primary" />;

const Users = (props: UsersProps) => {
  const router = useRouter();
  return (
    <>
      <MaterialTable
        data={props.users}
        columns={[
          { title: 'Email', field: 'email' },
          { title: 'Jméno', field: 'name' },
          { title: 'Příjmení', field: 'surname' },
          {
            title: 'Status',
            field: 'acitve',
            render: data => (data.active ? 'Aktivní' : 'Neaktivní'),
            customFilterAndSearch: (filter, rowData) => {
              if (filter.length === 0) return true;
              return filter.some(f => rowData.active.toString() === f);
            },
            lookup: { true: 'Aktivní', false: 'Neaktivní' },
          },
        ]}
        options={{ filtering: true }}
        actions={[
          {
            icon: Info,
            tooltip: 'Detail',
            onClick: (e, rowData) => {
              router.push({ pathname: routes.users.userDetail, query: { userId: rowData.id } });
            },
          },
        ]}
      />
    </>
  );
};

export default Users;
