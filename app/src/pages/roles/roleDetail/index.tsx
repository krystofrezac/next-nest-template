import React from 'react';

import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import { withSnackbar } from 'notistack';

import routes from '@template/shared/config/app/routes';

import withPage from 'components/withPage';
import PaperWithTabs from 'components/PaperWithTabs';

import roleDetailBreadcrumbs from './breadcrumbs';
import ResourcesIndex from './resources';
import { RoleDetailIndexProps, RoleFindById, RoleFindByIdVars } from './types';

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
  const [roleRemove] = useMutation(ROLE_REMOVE);

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
          router.push(routes.roles.index);
        }
      })
      .catch(() => {
        props.enqueueSnackbar('Něco se pokazilo', { variant: 'error' });
      });
  };

  return (
    <>
      <PaperWithTabs
        title={data ? data.roleFindById.name : ''}
        tabs={[{ label: 'Zdroje', panel: <ResourcesIndex /> }]}
        actions={[
          <Button key="actionRemove" color="secondary" variant="contained" onClick={submitHandler}>
            Odstranit
          </Button>,
        ]}
      />
    </>
  );
};

export default withPage(withSnackbar(RoleDetailIndex), roleDetailBreadcrumbs);
