import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { ResourceDetailProps } from 'pages/roles/resourceDetail/types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  fitWidth: {
    display: 'table',
  },
}));

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
        <TableCell>{p.children}</TableCell>
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
            {category.name}
          </Row>
          <Row name="Role" tooltip="Role které mají daný zdroj aktivní">
            {roles.map(role => (
              <div key={`role${role.id}`}>{role.name}</div>
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
