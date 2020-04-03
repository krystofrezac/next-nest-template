import React from 'react';

import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';

import resources from '@template/shared/config/api/resources';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import { ResourceCategoryFindById, ResourceCategoryFindByIdVars } from './types';
import resourceCategoryDetailBreadcrumbs from './breadcrumbs';
import ResourceCategoryDetail from './resourceCategoryDetail';

const RESOURCE_CATEGORY_FIND_BY_ID = gql`
  query($id: Int!) {
    resourceCategoryFindById(id: $id) {
      id
      name
      resources {
        id
        name
      }
    }
  }
`;

const ResourceCategoryDetailIndex = () => {
  const router = useRouter();
  const [resourceCategoryFindById, { data, error, loading }] = useLazyQuery<
    ResourceCategoryFindById,
    ResourceCategoryFindByIdVars
  >(RESOURCE_CATEGORY_FIND_BY_ID);
  if (+router.query.categoryId && !data && !error && !loading) {
    resourceCategoryFindById({ variables: { id: +router.query.categoryId } });
  }

  return (
    <>
      <Paper title={data ? data.resourceCategoryFindById.name : ''}>
        <ResourceCategoryDetail category={data ? data.resourceCategoryFindById : undefined} />
      </Paper>
    </>
  );
};

export default withPage(ResourceCategoryDetailIndex, resourceCategoryDetailBreadcrumbs, [
  [resources.role.edit],
]);
