import React from 'react';
import withPage from 'components/withPage';
import routes from '@template/shared/config/app/routes';
import { Paper, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const DashboardIndex = () => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h2">
          Novinky
        </Typography>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores consequatur
        eveniet facere laboriosam minus nisi pariatur perspiciatis quos reprehenderit!
      </Paper>
    </>
  );
};

export default withPage(DashboardIndex, 'Přehled', [
  { label: 'Přehled', route: routes.dashboard },
  { label: 'A', route: routes.dashboard },
  { label: 'B', route: routes.dashboard },
]);
