import React from 'react';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { withSnackbar } from 'notistack';
import { useRouter } from 'next/router';

import routes from '@template/shared/config/app/routes';
import resources from '@template/shared/config/api/resources';

import withPage from 'components/withPage';

import UserLoginDataDialog from './userLoginDataDialog';
import addUserBreadcrumbs from './breadcrumbs';
import AddUser from './addUser';
import { AddUserIndexProps, UserRegister, UserRegisterVars } from './types';

const USER_REGISTER = gql`
  mutation($email: String!, $name: String!, $surname: String!) {
    userRegister(email: $email, name: $name, surname: $surname) {
      id
      email
      generatedPassword
    }
  }
`;

const AddUserIndex = (props: AddUserIndexProps) => {
  const [userRegister, { loading, data }] = useMutation<UserRegister, UserRegisterVars>(
    USER_REGISTER,
  );
  const router = useRouter();

  const onSubmit = (email: string, name: string, surname: string) => {
    userRegister({ variables: { email, name, surname } })
      .then(res => {
        if (res.data) {
          props.enqueueSnackbar('Uživatel úspěšně přidán', { variant: 'success' });
        }
      })
      .catch(() => {
        props.enqueueSnackbar('Uživatele se nepovedlo přidat', { variant: 'error' });
      });
  };
  return (
    <>
      <AddUser onSubmit={onSubmit} loading={loading} />
      <UserLoginDataDialog
        open={Boolean(data)}
        close={() => router.push(routes.users.index)}
        email={data?.userRegister.email}
        password={data?.userRegister.generatedPassword}
      />
    </>
  );
};

export default withPage(withSnackbar(AddUserIndex), addUserBreadcrumbs, [[resources.user.add]]);
