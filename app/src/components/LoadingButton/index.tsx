import React from 'react';

import { Button, CircularProgress, makeStyles } from '@material-ui/core';

import { Props } from './types';

const useStyles = makeStyles({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    display: 'table',
    position: 'relative',
  },
  button: {
    width: '100%',
  },
});

const LoadingButton = (props: Props) => {
  const classes = useStyles({});
  const { loading, ...rest } = props;
  const loadingColor =
    props.color === 'primary' || props.color === 'secondary' ? props.color : 'primary';

  return (
    <div className={classes.wrapper}>
      <Button className={classes.button} disabled={loading} {...rest} />
      {loading && (
        <CircularProgress size={24} color={loadingColor} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default LoadingButton;
