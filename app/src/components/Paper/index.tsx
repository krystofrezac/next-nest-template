import { PaperProps, makeStyles, Paper as PaperPrefab, Typography, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const Paper = (props: PaperProps) => {
  const classes = useStyles();

  const { title, children, ...rest } = props;

  return (
    <PaperPrefab className={classes.paper} {...rest}>
      {title && (
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      )}
      {children}
    </PaperPrefab>
  );
};

export default Paper;
