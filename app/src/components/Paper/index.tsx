import React from 'react';

import {
  makeStyles,
  Paper as PaperPrefab,
  Typography,
  Theme,
  CircularProgress,
} from '@material-ui/core';

import { PaperProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  wrapper: {
    width: '100%',
    display: 'table',
    position: 'relative',
  },
  progress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  actions: {
    display: 'grid',
    justifyItems: 'right',
    marginTop: theme.spacing(2),
  },
  actionsInnerWrapper: {
    display: 'flex',
  },
  action: {
    marginLeft: theme.spacing(2),
  },
}));

const Paper = (props: PaperProps) => {
  const classes = useStyles();

  const { title, children, loading, actions, ...rest } = props;

  return (
    <div className={`${classes.wrapper} `}>
      <PaperPrefab className={classes.paper} elevation={2} {...rest}>
        {title && (
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        )}
        {children}
        <div className={classes.actions}>
          <div className={classes.actionsInnerWrapper}>
            {actions &&
              actions.map((a, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className={classes.action}>
                  {a}
                </div>
              ))}
          </div>
        </div>
      </PaperPrefab>
      {loading && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
};

export default Paper;
