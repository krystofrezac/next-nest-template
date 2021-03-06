import React from 'react';

import { IconButton, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Link from 'next/link';

import routes from '@template/shared/config/app/routes';

import { ResourcesProps } from './types';

const Resources = (props: ResourcesProps) => {
  const { resources } = props;
  return (
    <>
      {props.resources?.length === 0 && <Typography>Role nemá žádné přiřazené zdroje</Typography>}
      <List>
        {resources &&
          resources.map(resource => (
            <ListItem key={resource.id}>
              <ListItemText>
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
              </ListItemText>
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default Resources;
