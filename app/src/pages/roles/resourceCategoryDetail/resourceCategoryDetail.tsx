import React from 'react';

import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Link from 'next/link';

import routes from '@template/shared/config/app/routes';

import SimpleRow from 'components/table/SimpeRow';
import SimpleTable from 'components/table/SimpleTable';
import { ResourceCategoryDetailProps } from './types';

const ResourceCategoryDetail = (props: ResourceCategoryDetailProps) => {
  const { category } = props;
  const resources = category ? category.resources : [];

  return (
    <>
      <SimpleTable>
        <>
          <SimpleRow name="Zdroje" tooltip="Zdroje které spadají pod danou kategorii">
            {resources.map(resource => (
              <div key={`resource${resource.id}`}>
                <Link
                  href={{
                    pathname: routes.roles.resourceDetail,
                    query: { resourceId: resource.id },
                  }}
                >
                  <IconButton color="primary">
                    <InfoIcon />
                  </IconButton>
                </Link>
                {resource.label}
              </div>
            ))}
          </SimpleRow>
        </>
      </SimpleTable>
    </>
  );
};

export default ResourceCategoryDetail;
