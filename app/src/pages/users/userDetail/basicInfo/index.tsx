import React, { useState } from 'react';

import dateFormat from 'dateformat';
import { useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withSnackbar } from 'notistack';

import { emailRegex } from '@template/shared/config/regexs';
import resources from '@template/shared/config/api/resources';

import SimpleTable from 'components/table/SimpleTable';
import SimpleRow from 'components/table/SimpeRow';
import Actions from 'components/Actions';
import LoadingButton from 'components/LoadingButton';
import useResources from 'components/resources/useResources';

import { BasicInfoProps, FormTypes, UserEdit, UserEditVars } from './types';

const USER_EDIT = gql`
  mutation($id: Int!, $email: String!, $name: String!, $surname: String!) {
    userEdit(id: $id, email: $email, name: $name, surname: $surname) {
      id
      name
      surname
      email
    }
  }
`;

const BasicInfo = ({ user, loading, ...props }: BasicInfoProps) => {
  const [editing, setEditing] = useState(false);
  const { handleSubmit, register, errors, reset } = useForm<FormTypes>();
  const [userEdit, { loading: mutationLoading }] = useMutation<UserEdit, UserEditVars>(USER_EDIT);
  const canEdit = useResources([[resources.user.edit]]);

  const submitHandler = (values: FormTypes) => {
    userEdit({
      variables: { id: user.id, email: values.email, name: values.name, surname: values.surname },
    })
      .then(() => {
        props.enqueueSnackbar('Uživatel úspěšně upraven', { variant: 'success' });
        setEditing(false);
      })
      .catch(() => {
        props.enqueueSnackbar('Nepovedlo se upravit uživatele', { variant: 'error' });
      });
  };

  const email = user ? user.email : '';
  const name = user ? user.name : '';
  const surname = user ? user.surname : '';
  const registerDate = new Date(user?.createTime || Date.now());
  const formattedRegisterDate = dateFormat(registerDate, 'dd.mm.yyyy HH:MM:ss');
  const lastLoginDate = new Date(user?.lastLoginTime || Date.now());
  const formattedLastLoginDate = user?.lastLoginTime
    ? dateFormat(lastLoginDate, 'dd.mm.yyyy HH:MM:ss')
    : '-';

  return (
    <>
      <SimpleTable>
        <SimpleRow name="Email">
          {!editing ? (
            email
          ) : (
            <TextField
              name="email"
              inputRef={register({ required: true, pattern: emailRegex })}
              error={errors.email !== undefined}
              defaultValue={email}
            />
          )}
        </SimpleRow>
        <SimpleRow name="Jméno">
          {!editing ? (
            name
          ) : (
            <TextField
              name="name"
              inputRef={register({ required: true })}
              error={errors.name !== undefined}
              defaultValue={name}
            />
          )}
        </SimpleRow>
        <SimpleRow name="Příjmení">
          {!editing ? (
            surname
          ) : (
            <TextField
              name="surname"
              inputRef={register({ required: true })}
              error={errors.surname !== undefined}
              defaultValue={surname}
            />
          )}
        </SimpleRow>
        <SimpleRow name="Datum registrace">{formattedRegisterDate}</SimpleRow>
        <SimpleRow name="Poslední přihlášení">{formattedLastLoginDate}</SimpleRow>
        <SimpleRow name="Status">{user?.active ? 'Aktivní' : 'Neaktivní'}</SimpleRow>
      </SimpleTable>
      <Actions
        actions={
          !editing
            ? [
                {
                  id: 0,
                  element: (
                    <LoadingButton
                      loading={loading}
                      disabled={!canEdit}
                      variant="contained"
                      color="primary"
                      onClick={() => setEditing(true)}
                    >
                      Upravit
                    </LoadingButton>
                  ),
                },
              ]
            : [
                {
                  id: 0,
                  element: (
                    <LoadingButton
                      loading={mutationLoading}
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit(submitHandler)}
                    >
                      Uložit
                    </LoadingButton>
                  ),
                },
                {
                  id: 1,
                  element: (
                    <LoadingButton
                      loading={mutationLoading}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        reset();
                        setEditing(false);
                      }}
                    >
                      Zrušit
                    </LoadingButton>
                  ),
                },
              ]
        }
      />
    </>
  );
};

export default withSnackbar(BasicInfo);
