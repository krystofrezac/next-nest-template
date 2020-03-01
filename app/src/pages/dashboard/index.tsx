import React from 'react';

import { connect } from 'react-redux';

import routes from '@template/shared/config/app/routes';

import withPage from 'components/withPage';

import { State } from 'redux/reducers/types';

import { DashboardIndexProps, MapState } from './types';
import Dashboard from './dashboard';

const DashboardIndex = (props: DashboardIndexProps) => {
  return <Dashboard user={props.user} />;
};

const mapStateToProps = (state: State): MapState => ({
  user: state.user,
});

export default withPage(connect(mapStateToProps)(DashboardIndex), [
  { label: 'Přehled', link: routes.dashboard },
]);
