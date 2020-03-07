import React from 'react';

import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { withSnackbar } from 'notistack';
import { Dispatch } from 'redux';
import { rolesRemoveRole } from 'redux/actions/roles';
import { connect } from 'react-redux';

import routes from '@template/shared/config/app/routes';
import apiErrors from '@template/shared/config/apiErrors';

import withPage from 'components/withPage';
import PaperWithTabs from 'components/PaperWithTabs';
import LoadingButton from 'components/LoadingButton';

import roleDetailBreadcrumbs from './breadcrumbs';
import ResourcesIndex from './resources';
import UsersIndex from './users';
import {
  MapDispatch,
  MapState,
  RoleDetailIndexProps,
  RoleFindById,
  RoleFindByIdVars,
} from './types';

const ROLE_FIND_BY_ID = gql`
  query($id: Int!) {
    roleFindById(id: $id) {
      id
      name
    }
  }
`;

const ROLE_REMOVE = gql`
  mutation($id: Int!) {
    roleRemove(id: $id)
  }
`;

const RoleDetailIndex = (props: RoleDetailIndexProps) => {
  const router = useRouter();
  const [roleFindById, { data, error, loading }] = useLazyQuery<RoleFindById, RoleFindByIdVars>(
    ROLE_FIND_BY_ID,
  );
  const [roleRemove, { loading: mutationLoading }] = useMutation(ROLE_REMOVE);

  if (router.query.roleId && !data && !error && !loading) {
    roleFindById({ variables: { id: +router.query.roleId } });
  }

  const submitHandler = () => {
    roleRemove({
      variables: { id: +router.query.roleId },
    })
      .then(res => {
        if (res.data) {
          props.enqueueSnackbar('Role úspěšně odstraněna', { variant: 'success' });
          props.removeRole(+router.query.roleId);
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
      <PaperWithTabs
        title={data ? data.roleFindById.name : ''}
        tabs={[
          { label: 'Zdroje', panel: <ResourcesIndex /> },
          { label: 'Uživatelé', panel: <UsersIndex /> },
        ]}
        actions={[
          <LoadingButton
            loading={mutationLoading}
            key="actionRemove"
            color="secondary"
            variant="contained"
            onClick={submitHandler}
          >
            Odstranit
          </LoadingButton>,
        ]}
      />
    </>
  );
};

const mapStateToProps = (): MapState => ({});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatch => ({
  removeRole: (id: number) => dispatch(rolesRemoveRole(id)),
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(RoleDetailIndex)),
  roleDetailBreadcrumbs,
);
