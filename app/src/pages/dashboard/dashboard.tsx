import React from 'react';

import Paper from 'components/Paper';

import { Grid } from '@material-ui/core';
import { DashboardProps } from './types';

const Dashboard = (props: DashboardProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper title="Uživatel">
            <div>{`Jméno: ${props.user.name}`}</div>
            <div>{`Příjmení: ${props.user.surname}`}</div>
            <div>{`Email: ${props.user.email}`}</div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper title="Přehled" />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
