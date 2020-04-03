import React, { useState } from 'react';

import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';

import { roleNameRegex } from '@template/shared/config/regexs';

import SimpleTable from 'components/table/SimpleTable';
import SimpleRow from 'components/table/SimpeRow';
import Actions from 'components/Actions';

import { useMutation } from '@apollo/react-hooks';
import { withSnackbar } from 'notistack';
import LoadingButton from 'components/LoadingButton';
import { BasicInfoProps } from '../types';
import { FormTypes, RoleEdit, RoleEditVars } from './types';

const ROLE_EDIT = gql`
  mutation($roleId: Int!, $name: String!, $maxUsers: Int!) {
    roleEdit(roleId: $roleId, name: $name, maxUsers: $maxUsers) {
      id
      name
      maxUsers
    }
  }
`;

const BasicInfo = (props: BasicInfoProps) => {
  const [editing, setEditing] = useState(false);
  const [roleEdit, { loading }] = useMutation<RoleEdit, RoleEditVars>(ROLE_EDIT);
  const { handleSubmit, register, errors, reset } = useForm<FormTypes>();

  const submitHandler = (values: FormTypes) => {
    roleEdit({
      variables: { roleId: props.role.id, name: values.name, maxUsers: +values.maxUsers },
    })
      .then(res => {
        if (res.data) {
          props.enqueueSnackbar('Role úspešně změněna', { variant: 'success' });
          setEditing(false);
        }
      })
      .catch(() => {
        props.enqueueSnackbar('Role se nepovedlo změnit', { variant: 'error' });
      });
  };

  return (
    <>
      <SimpleTable>
        <SimpleRow name="Název">
          {!editing ? (
            props.role?.name
          ) : (
            <TextField
              name="name"
              error={errors.name !== undefined}
              inputRef={register({ required: true, pattern: roleNameRegex })}
              defaultValue={props.role?.name}
            />
          )}
        </SimpleRow>
        <SimpleRow name="Maximílní počet uživatelů">
          {!editing ? (
            props.role?.maxUsers
          ) : (
            <TextField
              name="maxUsers"
              inputRef={register({ required: true })}
              type="number"
              error={errors.maxUsers !== undefined}
              defaultValue={props.role?.maxUsers}
            />
          )}
        </SimpleRow>
        <SimpleRow name="Počet uživatelů">{props.role?.userCount}</SimpleRow>
      </SimpleTable>
      <Actions
        actions={
          !editing
            ? [
                {
                  id: 1,
                  element: (
                    <LoadingButton
                      loading={props.loading}
                      color="primary"
                      variant="contained"
                      onClick={() => setEditing(true)}
                    >
                      Editovat
                    </LoadingButton>
                  ),
                },
              ]
            : [
                {
                  id: 1,
                  element: (
                    <LoadingButton
                      loading={loading}
                      color="primary"
                      variant="contained"
                      onClick={handleSubmit(submitHandler)}
                    >
                      Uložit
                    </LoadingButton>
                  ),
                },
                {
                  id: 2,
                  element: (
                    <LoadingButton
                      loading={loading}
                      color="secondary"
                      variant="contained"
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
