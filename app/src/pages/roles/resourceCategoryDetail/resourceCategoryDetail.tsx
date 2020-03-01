import React, { CSSProperties } from 'react';

import {
  TableCell,
  TableRow,
  Tooltip,
  makeStyles,
  Table,
  TableHead,
  TableBody,
  IconButton,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Link from 'next/link';

import routes from '@template/shared/config/app/routes';

import { ResourceCategoryDetailProps } from './types';

const useStyles = makeStyles({
  fitWidth: {
    display: 'table',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
});

const ResourceCategoryDetail = (props: ResourceCategoryDetailProps) => {
  const classes = useStyles();

  const { category } = props;
  const resources = category ? category.resources : [];

  const Row: React.FC<{ name: string; tooltip?: string }> = p => {
    const name = <div className={classes.fitWidth}>{p.name}</div>;
    return (
      <TableRow>
        <TableCell>
          {p.tooltip ? (
            <Tooltip arrow title={p.tooltip}>
              {name}
            </Tooltip>
          ) : (
            name
          )}
        </TableCell>
        <TableCell padding="none">
          <div className={classes.noWrap}>{p.children}</div>
        </TableCell>
      </TableRow>
    );
  };
  return (
    <>
      <Table>
        <TableHead>
          <Row name="Informace">Hodnota</Row>
        </TableHead>
        <TableBody>
          <Row name="Zdroje" tooltip="Zdroje které spadají pod danou kategorii">
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
                {resource.name}
              </div>
            ))}
          </Row>
        </TableBody>
      </Table>
    </>
  );
};

export default ResourceCategoryDetail;
