import React from 'react';

import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

import { RoleFindById, RoleFindByIdVars } from './types';
import Resources from './resources';

const ROLE_FIND_BY_ID = gql`
  query($id: Int!) {
    roleFindById(id: $id) {
      id
      resources {
        id
        name
      }
    }
  }
`;

const ResourcesIndex = () => {
  const router = useRouter();
  const [roleFindById, { data, error, loading }] = useLazyQuery<RoleFindById, RoleFindByIdVars>(
    ROLE_FIND_BY_ID,
  );

  if (router.query.roleId && !data && !error && !loading) {
    roleFindById({ variables: { id: +router.query.roleId } });
  }

  return (
    <>
      <Resources resources={data ? data.roleFindById.resources : undefined} />
    </>
  );
};

export default ResourcesIndex;
