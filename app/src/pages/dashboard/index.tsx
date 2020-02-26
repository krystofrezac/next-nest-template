import React from 'react';

import routes from '@template/shared/config/app/routes';

import withPage from 'components/withPage';
import Paper from 'components/Paper';
import { State } from 'redux/reducers/types';
import { connect } from 'react-redux';

const DashboardIndex = (props: any) => {
  return (
    <>
      <Paper title="Přehled">{props.user.name}</Paper>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

export default withPage(connect(mapStateToProps)(DashboardIndex), 'Přehled', [
  { label: 'Přehled', route: routes.dashboard },
  { label: 'A', route: routes.dashboard },
  { label: 'B', route: routes.dashboard },
]);
