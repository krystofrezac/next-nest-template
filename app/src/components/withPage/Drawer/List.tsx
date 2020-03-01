import { useRouter } from 'next/router';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import listConfig from 'components/withPage/Drawer/listConfig';
import React from 'react';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const DrawerList = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <List>
      {listConfig.map(item => (
        <Link key={item.label + item.link} href={item.link}>
          <a href="#" className={classes.link}>
            <ListItem button selected={router.pathname.startsWith(item.link)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </a>
        </Link>
      ))}
    </List>
  );
};

export default DrawerList;
