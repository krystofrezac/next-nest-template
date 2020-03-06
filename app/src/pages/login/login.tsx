import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
  CircularProgress,
} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { emailRegex } from '@template/shared/config/regexs';

import { LoginProps } from './types';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: 'absolute',
    marginTop: 5,
  },
}));

const Login = (props: LoginProps) => {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm<{ email: string; password: string }>();

  const onSubmit = values => {
    props.onSubmit(values.email, values.password);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {props.loading ? <CircularProgress size={46} className={classes.progress} /> : null}

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <TextField
            inputRef={register({ required: true, pattern: emailRegex })}
            error={errors.email !== undefined || props.badInputs}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            inputRef={register({ required: true })}
            error={errors.password !== undefined || props.badInputs}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
