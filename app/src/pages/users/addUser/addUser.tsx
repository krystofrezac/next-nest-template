import React from 'react';

import { Grid, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

import { emailRegex } from '@template/shared/config/regexs';

import Paper from 'components/Paper';
import LoadingButton from 'components/LoadingButton';

import { AddUserProps, FormValues } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

const AddUser = (props: AddUserProps) => {
  const classes = useStyles({});

  const { handleSubmit, register, errors } = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    props.onSubmit(values.email, values.name, values.surname);
  };

  return (
    <Paper
      title="Přidání uživatele"
      actions={[
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          loading={props.loading}
          key="actionAdd"
          color="primary"
          variant="contained"
        >
          Přidat uživatele
        </LoadingButton>,
      ]}
    >
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              error={Boolean(errors?.email)}
              inputRef={register({ required: true, pattern: emailRegex })}
              label="Email"
              variant="outlined"
            />
          </Grid>

          <Grid item>
            <TextField
              name="name"
              error={Boolean(errors?.name)}
              inputRef={register({ required: true })}
              label="Jméno"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              name="surname"
              error={Boolean(errors?.surname)}
              inputRef={register({ required: true })}
              label="Příjmení"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default AddUser;
