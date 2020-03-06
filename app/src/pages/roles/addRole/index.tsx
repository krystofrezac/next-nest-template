import React from 'react';

import { Button, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { withSnackbar } from 'notistack';
import { useRouter } from 'next/router';

import apiErrors from '@template/shared/config/apiErrors';
import routes from '@template/shared/config/app/routes';

import addRoleBreadcrumbs from 'pages/roles/addRole/breadcrumbs';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import { Dispatch } from 'redux';
import { Role } from 'redux/reducers/roles/types';
import { rolesAddRole } from 'redux/actions/roles';
import { connect } from 'react-redux';
import LoadingButton from 'components/LoadingButton';
import { AddRoleProps, MapDispatch, MapState, RoleCreate, RoleCreateVars } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    paddingTop: theme.spacing(2),
  },
}));

const ROLE_CREATE = gql`
  mutation($name: String!) {
    roleCreate(name: $name) {
      id
      name
      resources {
        id
        name
      }
    }
  }
`;

const AddRole = (props: AddRoleProps) => {
  const classes = useStyles();

  const router = useRouter();
  const [roleCreate, { loading }] = useMutation<RoleCreate, RoleCreateVars>(ROLE_CREATE);
  const { handleSubmit, register, errors } = useForm<{ name: string }>();

  const onSubmit = values => {
    roleCreate({ variables: { name: values.name } })
      .then(res => {
        if (res.data) {
          props.enqueueSnackbar('Role úspěšně vytvořena', { variant: 'success' });
          props.addRole(res.data.roleCreate);
          router.push(routes.roles.index);
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
        <LoadingButton
          loading={loading}
          key="actionAdd"
          color="primary"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Přidat
        </LoadingButton>,
        <LoadingButton loading={loading} key="actionCancel" color="secondary" variant="contained">
          Zrušit
        </LoadingButton>,
      ]}
    >
      <form>
        <div className={classes.textField}>
          <TextField
            variant="outlined"
            label="Název role"
            name="name"
            inputRef={register({ required: true, pattern: /[a-zA-Z]+/ })}
            error={errors.name !== undefined}
          />
        </div>
      </form>
    </Paper>
  );
};
const mapStateToProps = (): MapState => ({});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatch => ({
  addRole: (role: Role) => dispatch(rolesAddRole(role)),
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AddRole)),
  addRoleBreadcrumbs,
);
