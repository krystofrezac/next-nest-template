import React from 'react';

import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import resourceDetailBreadcrumbs from 'pages/roles/resourceDetail/breadcrumbs';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import { useRouter } from 'next/router';
import { ResourceFindById, ResourceFindByIdVars } from 'pages/roles/resourceDetail/types';
import ResourceDetail from './resourceDetail';

const RESOURCE_FIND_BY_ID = gql`
  query($id: Int!) {
    resourceFindById(id: $id) {
      id
      name
      description
      category {
        id
        name
      }
      minimalCount
      requires {
        id
        name
      }
      requiredBy {
        id
        name
      }
      roles {
        id
        name
      }
    }
  }
`;

const ResourceDetailIndex = () => {
  const router = useRouter();
  const [resourceFindById, { data, loading, error }] = useLazyQuery<
    ResourceFindById,
    ResourceFindByIdVars
  >(RESOURCE_FIND_BY_ID);

  if (+router.query.resourceId && !data && !loading && !error) {
    resourceFindById({ variables: { id: +router.query.resourceId } });
  }

  return (
    <>
      <Paper title={data ? data.resourceFindById.name : ''} loading={loading}>
        <ResourceDetail resource={data ? data.resourceFindById : undefined} />
      </Paper>
    </>
  );
};

export default withPage(ResourceDetailIndex, 'Detail zdroje', resourceDetailBreadcrumbs);
