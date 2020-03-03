import React from 'react';

import { Button, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { withSnackbar } from 'notistack';

import apiErrors from '@template/shared/config/apiErrors';

import addRoleBreadcrumbs from 'pages/roles/addRole/breadcrumbs';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import { AddRoleProps, RoleCreate, RoleCreateVars } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    paddingTop: theme.spacing(2),
  },
}));

const ROLE_CREATE = gql`
  mutation($name: String!) {
    roleCreate(name: $name) {
      id
      resources {
        id
        name
      }
    }
  }
`;

const AddRole = (props: AddRoleProps) => {
  const classes = useStyles();

  const [roleCreate] = useMutation<RoleCreate, RoleCreateVars>(ROLE_CREATE);
  const { handleSubmit, register, errors } = useForm<{ name: string }>();

  const onSubmit = values => {
    roleCreate({ variables: { name: values.name } })
      .then(res => {
        if (res.data) {
          props.enqueueSnackbar('Role úspěšně vytvořena', { variant: 'success' });
        }
      })
      .catch(error => {
        if (
          error.graphQLErrors.some(
            e => typeof e.message === 'string' && e.message.startsWith(apiErrors.db.duplicate),
          )
        ) {
          props.enqueueSnackbar('Role s tímto jménem již existuje', { variant: 'warning' });
        } else if (error.graphQLErrors.some(e => e.message.message === apiErrors.input.invalid)) {
          props.enqueueSnackbar('Na server přišel špatný požadavek', { variant: 'error' });
        } else {
          props.enqueueSnackbar('Něco se pokazilo', { variant: 'error' });
        }
      });
  };

  return (
    <Paper
      title="Přidání role"
      actions={[
        <Button
          key="actionAdd"
          color="primary"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Přidat
        </Button>,
        <Button key="actionCancel" color="secondary" variant="contained">
          Zrušit
        </Button>,
      ]}
    >
      <form>
        <div className={classes.textField}>
          <TextField
            variant="outlined"
            label="Název role"
            name="name"
            inputRef={register({ required: true,pattern:/[a-z]+/ })}
            error={errors.name !== undefined}
          />
        </div>
      </form>
    </Paper>
  );
};

export default withPage(withSnackbar(AddRole), addRoleBreadcrumbs);
