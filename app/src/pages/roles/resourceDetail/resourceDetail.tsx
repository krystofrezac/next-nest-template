import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  Tooltip,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Link from 'next/link';

import routes from '@template/shared/config/app/routes';

import { ResourceDetailProps } from './types';

const useStyles = makeStyles({
  fitWidth: {
    display: 'table',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
});

const ResourceDetail = (props: ResourceDetailProps) => {
  const classes = useStyles();

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

  const { resource } = props;

  const description = resource ? resource.description : '';
  const category = resource ? resource.category : { id: undefined, name: '' };
  const roles = resource ? resource.roles : [];
  const minimalCount = resource ? resource.minimalCount : '';
  const requires = resource ? resource.requires : [];
  const requiredBy = resource ? resource.requiredBy : [];

  return (
    <>
      <Typography>{description}</Typography>
      <Table>
        <TableHead>
          <Row name="Informace">Hodnota</Row>
        </TableHead>
        <TableBody>
          <Row name="Kategorie" tooltip="Kategorie pod kterou daný zdroj spadá">
            <Link
              href={{
                pathname: routes.roles.resourceCategoryDetail,
                query: { categoryId: category.id },
              }}
            >
              <IconButton color="primary">
                <InfoIcon />
              </IconButton>
            </Link>
            {category.name}
          </Row>
          <Row name="Role" tooltip="Role které mají daný zdroj aktivní">
            {roles.map(role => (
              <div key={`role${role.id}`}>
                <Link
                  href={{
                    pathname: routes.roles.roleDetail,
                    query: { roleId: role.id },
                  }}
                >
                  <IconButton color="primary">
                    <InfoIcon />
                  </IconButton>
                </Link>
                {role.name}
              </div>
            ))}
          </Row>
          <Row
            name="Minimální počet"
            tooltip="Minimánlí počet rolí, které musí obsahovat tento zdroj"
          >
            {minimalCount}
          </Row>
          <Row
            name="Vyžaduje"
            tooltip="Zdroje které musí mít role aktivní, aby bylo možné aktivovat tento zdroj"
          >
            {requires.map(r => (
              <div key={`requires${r.id}`}>{r.name}</div>
            ))}
          </Row>
          <Row
            name="Je vyžadována"
            tooltip="Zdroje, které potřebují tento zdroj aktivní, aby mohli být sami aktivní"
          >
            {requiredBy.map(r => (
              <div key={`requiredBy${r.id}`}>{r.name}</div>
            ))}
          </Row>
        </TableBody>
      </Table>
    </>
  );
};

export default ResourceDetail;
