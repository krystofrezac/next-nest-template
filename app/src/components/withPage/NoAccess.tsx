import React from 'react';
import { Button, Theme, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import routes from '@template/shared/config/app/routes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  center: {
    display: 'grid',
    alignItems: 'center',
    height: '100vh',
    justifyItems: 'center',
  },
  container: {
    display: 'grid',
    justifyItems: 'center',
    gridGap: theme.spacing(2),
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `"title title" "description description" "button1 button2"`,
    gridTemplateRows: '1fr 1fr 1fr',
  },
  itemContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'center',
    width: '100%',
  },
  fitWidth: {
    width: 'fit-content',
  },
}));

const NoAccess = () => {
  const classes = useStyles();

  const router = useRouter();

  return (
    <div className={classes.center}>
      <div className={classes.fitWidth}>
        <div className={classes.container}>
          <div style={{ gridArea: 'title' }}>
            <Typography align="center" variant="h4">
              Na tuto stránku nemáte přístup
            </Typography>
          </div>
          <div style={{ gridArea: 'description' }}>
            <Typography variant="h5">
              Vaše přihlášení vypršelo a nebo nemáte dostatečná práva
            </Typography>
          </div>
          <div>
            <Button href={`${routes.login}`} variant="contained" color="primary">
              Přihlásit se
            </Button>
          </div>
          <div>
            <Button onClick={router.back} variant="contained" color="secondary">
              Vratit se zpět
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoAccess;
