import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import useResources from 'components/resources/useResources';
import listConfig, { ListConfig } from './listConfig';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const DrawerList = () => {
  const classes = useStyles();
  const router = useRouter();

  const Item = ({
    link,
    icon,
    label,
    subList,
    resources,
  }: {
    link?: string;
    icon: JSX.Element;
    label: string;
    subList?: ListConfig[];
    resources?: string[][];
  }) => {
    const hasAccess = useResources(resources || []);
    const [open, setOpen] = useState(
      subList ? subList.some(s => router.pathname.startsWith(s.link)) : false,
    );
    const withoutLink = (
      <>
        <ListItem button selected={router.pathname.startsWith(link)} onClick={() => setOpen(!open)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
          {subList && <>{open ? <ExpandLess /> : <ExpandMore />}</>}
        </ListItem>
        {subList && (
          <Collapse in={open}>
            {subList.map(s => (
              <Item key={`subItem${s.label}-${label}-${link}`} {...s} />
            ))}
          </Collapse>
        )}
      </>
    );
    const withLink = link ? (
      <Link href={link}>
        <a href="#" className={classes.link}>
          {withoutLink}
        </a>
      </Link>
    ) : null;
    return <>{hasAccess && (link ? withLink : withoutLink)}</>;
  };

  return (
    <List>
      {listConfig.map(item => {
        return <Item key={`item${item.label}-${item.link}`} {...item} />;
      })}
    </List>
  );
};

export default DrawerList;
