import React from 'react';

import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';

import resources from '@template/shared/config/api/resources';

import withPage from 'components/withPage';
import PaperWithTabs from 'components/PaperWithTabs';
import useResources from 'components/resources/useResources';

import ActionsIndex from 'pages/roles/roleDetail/actions';
import BasicInfo from './basicInfo';
import roleDetailBreadcrumbs from './breadcrumbs';
import ResourcesIndex from './resources';
import UsersIndex from './users';
import { RoleFindById, RoleFindByIdVars } from './types';

const ROLE_FIND_BY_ID = gql`
  query($id: Int!) {
    roleFindById(id: $id) {
      id
      name
      maxUsers
      userCount
    }
  }
`;

const RoleDetailIndex = () => {
  const router = useRouter();
  const [roleFindById, { data, error, loading }] = useLazyQuery<RoleFindById, RoleFindByIdVars>(
    ROLE_FIND_BY_ID,
  );
  const canSeeAllUsers = useResources([[resources.user.seeAll]]);

  if (router.query.roleId && !data && !error && !loading) {
    roleFindById({ variables: { id: +router.query.roleId } });
  }

  return (
    <>
      <PaperWithTabs
        title={data ? data.roleFindById.name : ''}
        tabs={[
          {
            label: 'Základní informace',
            panel: <BasicInfo loading={loading} role={data?.roleFindById} />,
          },
          { label: 'Zdroje', panel: <ResourcesIndex /> },
          { label: 'Uživatelé', panel: <UsersIndex />, disabled: !canSeeAllUsers },
          { label: 'Akce', panel: <ActionsIndex /> },
        ]}
      />
    </>
  );
};

export default withPage(RoleDetailIndex, roleDetailBreadcrumbs, [[resources.role.edit]]);
