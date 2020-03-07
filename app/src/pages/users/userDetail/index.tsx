import React from 'react';

import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';

import withPage from 'components/withPage';
import PaperWithTabs from 'components/PaperWithTabs';

import roleFragment from './roleFragment';
import Roles from './roles';
import Actions from './actions';
import BasicInfo from './basicInfo';
import userDetailBreadcrumbs from './breadcrumbs';
import { UserFindById, UserFindByIdVars } from './types';

const USER_FIND_BY_ID = gql`
  ${roleFragment}
  query($id: Int!) {
    userFindById(id: $id) {
      id
      email
      name
      surname
      createTime
        active
      ...Roles
    }
  }
`;

const UserDetailIndex = () => {
  const [userFindById, { data, error, loading }] = useLazyQuery<UserFindById, UserFindByIdVars>(
    USER_FIND_BY_ID,
  );
  const router = useRouter();

  if (router.query.userId && !data && !error && !loading) {
    userFindById({ variables: { id: +router.query.userId } });
  }
  return (
    <PaperWithTabs
      title={data ? `${data.userFindById.name} ${data.userFindById.surname}` : ''}
      loading={loading}
      tabs={[
        {
          label: 'základní informace',
          panel: <BasicInfo user={data ? data.userFindById : undefined} />,
        },
        {
          label: 'role',
          panel: <Roles roles={data ? data.userFindById.roles : []} />,
        },
        { label: 'Akce', panel: <Actions /> },
      ]}
    />
  );
};

export default withPage(UserDetailIndex, userDetailBreadcrumbs);
