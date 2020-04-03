import React, { useState } from 'react';

import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import resources from '@template/shared/config/api/resources';

import resourceDetailBreadcrumbs from 'pages/roles/resourceDetail/breadcrumbs';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import { useRouter } from 'next/router';
import { ResourceFindById, ResourceFindByIdVars } from 'pages/roles/resourceDetail/types';
import { Button } from '@material-ui/core';
import ResourceDetail from './resourceDetail';
import routes from '../../../../../shared/config/app/routes';

const RESOURCE_FIND_BY_ID = gql`
  query($id: Int!) {
    resourceFindById(id: $id) {
      id
      name
      label
      description
      category {
        id
        name
        label
      }
      minimalCount
      requires {
        id
        name
        label
      }
      requiredBy {
        id
        name
        label
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
  const [lastId, setLastId] = useState(undefined);

  if (
    +router.query.resourceId &&
    ((!data && !loading && !error) || lastId !== +router.query.resourceId)
  ) {
    resourceFindById({ variables: { id: +router.query.resourceId } });
    setLastId(+router.query.resourceId);
  }

  return (
    <>
      <Paper
        title={data ? data.resourceFindById.label : ''}
        loading={loading}
        actions={[
          <Button
            key="actionZoom"
            color="primary"
            variant="contained"
            onClick={() => {
              router.push({
                pathname: `${routes.roles.index}`,
                hash: `#resource-${+data?.resourceFindById.id}`,
                query: { resourceId: data?.resourceFindById.id },
              });
            }}
          >
            Přiblížit
          </Button>,
        ]}
      >
        <ResourceDetail resource={data ? data.resourceFindById : undefined} />
      </Paper>
    </>
  );
};

export default withPage(ResourceDetailIndex, resourceDetailBreadcrumbs, [[resources.role.edit]]);
