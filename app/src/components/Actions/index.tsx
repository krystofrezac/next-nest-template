import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    paddingTop: theme.spacing(2),
    display: 'grid',
    justifyItems: 'end',
    gridTemplateColumns: '1fr auto auto auto',
  },
  action: {
    display: 'table',
    marginLeft: theme.spacing(2),
  },
}));

const Actions = (props: { actions: { id: number; element: JSX.Element }[] }) => {
  const classes = useStyles();
  return (
    <div className={classes.actions}>
      {props.actions.map(action => (
        <div key={action.id} className={classes.action}>
          {action.element}
        </div>
      ))}
    </div>
  );
};

export default Actions;
