import React from 'react';

import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import Users from './users';
import { RoleFindById, RoleFindByIdVars } from './types';

const ROLE_FIND_BY_ID = gql`
  query($id: Int!) {
    roleFindById(id: $id) {
      id
      users {
        id
        email
        name
        surname
        active
      }
    }
  }
`;

const UsersIndex = () => {
  const router = useRouter();
  const [roleFindById, { data, loading, error }] = useLazyQuery<RoleFindById, RoleFindByIdVars>(
    ROLE_FIND_BY_ID,
  );

  if (router.query.roleId && !data && !loading && !error) {
    roleFindById({ variables: { id: +router.query.roleId } });
  }
  return <Users users={data?.roleFindById.users || []} />;
};

export default UsersIndex;
