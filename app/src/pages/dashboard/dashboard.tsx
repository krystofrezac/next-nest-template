import React from 'react';

import { Grid } from '@material-ui/core';

import Paper from 'components/Paper';
import PaperWithTabs from 'components/PaperWithTabs';

const Dashboard = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper title="Uživatel">
            <div>Jméno: A</div>
            <div>Příjmení: B</div>
            <div>Email: C</div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper title="Přehled" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PaperWithTabs
            title="Tabs"
            tabs={[
              { label: 'Ahojky', panel: <div>ahojky</div> },
              { label: 'Hola', panel: <div>hila</div> },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
