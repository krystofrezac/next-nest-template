import React from 'react';

import { Button, Grid, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import dateFormat from 'dateformat';

import routes from '@template/shared/config/app/routes';

import withPage from 'components/withPage';
import Paper from 'components/Paper';

import profileBreadcrumbs from './breadcrumbs';
import { UserGetLogged } from './types';

const USER_GET_LOGGED = gql`
  {
    userGetLogged {
      id
      name
      surname
      email
      createTime
    }
  }
`;

const useStyles = makeStyles({
  actionContainer: {
    display: 'grid',
    justifyItems: 'right',
  },
});

const ProfileIndex = () => {
  const classes = useStyles();
  const { data, loading } = useQuery<UserGetLogged>(USER_GET_LOGGED);
  const date = new Date(data?.userGetLogged.createTime || '');
  const formattedDate = dateFormat(date, 'dd.mm.yyyy HH:MM:ss');
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper title="Profil" loading={loading}>
            <Typography>{`Jméno: ${data?.userGetLogged.name || ''}`}</Typography>
            <Typography>{`Příjmení: ${data?.userGetLogged.surname || ''}`}</Typography>
            <Typography>{`Email: ${data?.userGetLogged.email || ''}`}</Typography>
            <Typography>{`Datum registrace: ${formattedDate}`}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper title="Akce" loading={loading}>
            <Typography variant="h6">Změna hesla</Typography>
            <Typography>
              Po této akci se vám změní přihlašocvací heslo a již se nebudete schopni přihlásit
              starým heslem.
            </Typography>
            <div className={classes.actionContainer}>
              <Link href={routes.profile.changePassword}>
                <Button color="primary" variant="contained">
                  Změnit heslo
                </Button>
              </Link>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default withPage(ProfileIndex, profileBreadcrumbs);
