import React from 'react';
import { Typography } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import routes from '@template/shared/config/app/routes';
import apiErrors from '@template/shared/config/api/errors';

import Actions from 'components/Actions';
import LoadingButton from 'components/LoadingButton';

const ROLE_REMOVE = gql`
  mutation($id: Int!) {
    roleRemove(id: $id)
  }
`;

const ActionsIndex = (props: WithSnackbarProps) => {
  const router = useRouter();
  const [roleRemove, { loading: mutationLoading }] = useMutation(ROLE_REMOVE);

  const submitHandler = () => {
    roleRemove({
      variables: { id: +router.query.roleId },
    })
      .then(res => {
        if (res.data) {
          props.enqueueSnackbar('Role úspěšně odstraněna', { variant: 'success' });
          router.push(routes.roles.index);
        }
      })
      .catch(err => {
        if (err.graphQLErrors.some(e => e.message?.message === apiErrors.remove.roleMinimalCount))
          props.enqueueSnackbar('V systému musí být minimálně jedna role', { variant: 'error' });
        else if (
          err.graphQLErrors.some(e => e.message?.message === apiErrors.remove.resourceConditions)
        )
          props.enqueueSnackbar('Role nejde odstranit, protože by nebyli splněny podmínky zdrojů', {
            variant: 'error',
          });
        else props.enqueueSnackbar('Něco se pokazilo', { variant: 'error' });
      });
  };

  return (
    <>
      <Typography variant="h6">Odstranit</Typography>
      <Actions
        actions={[
          {
            id: 1,
            element: (
              <LoadingButton
                loading={mutationLoading}
                key="actionRemove"
                color="secondary"
                variant="contained"
                onClick={submitHandler}
              >
                Odstranit
              </LoadingButton>
            ),
          },
        ]}
      />
    </>
  );
};

export default withSnackbar(ActionsIndex);
