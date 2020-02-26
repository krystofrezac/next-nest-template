import { useRouter } from 'next/router';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import listConfig from 'components/withPage/Drawer/listConfig';
import React from 'react';

const DrawerList = () => {
  const router = useRouter();
  return (
    <List>
      {listConfig.map(item => (
        <ListItem
          button
          key={item.label + item.link}
          selected={item.link.startsWith(router.pathname)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
};

export default DrawerList;
