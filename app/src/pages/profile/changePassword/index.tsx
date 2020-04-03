import React from 'react';

import { TextField, Grid, Theme } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import withPage from 'components/withPage';
import Paper from 'components/Paper';
import LoadingButton from 'components/LoadingButton';

import apiErrors from '@template/shared/config/api/errors';
import routes from '@template/shared/config/app/routes';

import { FormValues, UserChangeMyPassword, UserChangeMyPasswordVars } from './types';
import changePasswordBreadcrumbs from './breadcrumbs';

const USER_CHANGE_MY_PASSWORD = gql`
  mutation($old: String!, $new: String!) {
    userChangeMyPassword(oldPassword: $old, newPassword: $new) {
      id
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

const ChangePassword = (props: WithSnackbarProps) => {
  const classes = useStyles();

  const router = useRouter();
  const { register, handleSubmit, errors, setError } = useForm<FormValues>();
  const [userChangeMyPassword, { loading }] = useMutation<
    UserChangeMyPassword,
    UserChangeMyPasswordVars
  >(USER_CHANGE_MY_PASSWORD);

  const submitHandler = (values: FormValues) => {
    if (values.newPassword1 !== values.newPassword2) {
      setError('newPassword1', 'notMatch');
      setError('newPassword2', 'notMatch');
    } else {
      userChangeMyPassword({
        variables: { old: values.oldPassword, new: values.newPassword1 },
      })
        .then(res => {
          if (res.data) {
            props.enqueueSnackbar('Heslo úspěšně změněno', { variant: 'success' });
            router.push(routes.profile.index);
          }
        })
        .catch(err => {
          if (err.graphQLErrors.some(e => e.message?.message === apiErrors.input.invalid)) {
            setError('oldPassword', 'notMatch');
            props.enqueueSnackbar('Staré heslo není správně', { variant: 'error' });
          } else {
            props.enqueueSnackbar('Něco se pokazilo', { variant: 'error' });
          }
        });
    }
  };

  return (
    <>
      <Paper
        title="Změna hesla"
        actions={[
          <LoadingButton
            loading={loading}
            key="actionChange"
            onClick={handleSubmit(submitHandler)}
            color="primary"
            variant="contained"
          >
            Změnit heslo
          </LoadingButton>,
        ]}
      >
        <div className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="password"
                name="oldPassword"
                error={Boolean(errors?.oldPassword)}
                inputRef={register({ required: true })}
                variant="outlined"
                label="staré heslo"
              />
            </Grid>
            <Grid item>
              <TextField
                type="password"
                name="newPassword1"
                error={Boolean(errors?.newPassword1)}
                inputRef={register({ required: true })}
                variant="outlined"
                label="nové heslo"
              />
            </Grid>
            <Grid item>
              <TextField
                type="password"
                name="newPassword2"
                error={Boolean(errors?.newPassword2)}
                inputRef={register({ required: true })}
                variant="outlined"
                label="nové heslo znovu"
              />
            </Grid>
          </Grid>
        </div>
      </Paper>
    </>
  );
};

export default withPage(withSnackbar(ChangePassword), changePasswordBreadcrumbs);
