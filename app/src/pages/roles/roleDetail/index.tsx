import React from 'react';

import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';

import withPage from 'components/withPage';
import PaperWithTabs from 'components/PaperWithTabs';

import roleDetailBreadcrumbs from './breadcrumbs';
import ResourcesIndex from './resources';
import { RoleFindById, RoleFindByIdVars } from './types';

const ROLE_FIND_BY_ID = gql`
  query($id: Int!) {
    roleFindById(id: $id) {
      id
      name
    }
  }
`;

const RoleDetailIndex = () => {
  const router = useRouter();
  const [roleFindById, { data, error, loading }] = useLazyQuery<RoleFindById, RoleFindByIdVars>(
    ROLE_FIND_BY_ID,
  );

  if (router.query.roleId && !data && !error && !loading) {
    roleFindById({ variables: { id: +router.query.roleId } });
  }
  return (
    <>
      <PaperWithTabs
        title={data ? data.roleFindById.name : ''}
        tabs={[{ label: 'Zdroje', panel: <ResourcesIndex /> }]}
      />
    </>
  );
};

export default withPage(RoleDetailIndex, roleDetailBreadcrumbs);
