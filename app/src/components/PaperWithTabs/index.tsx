import React, { useState } from 'react';

import {
  makeStyles,
  Paper as PaperPrefab,
  Typography,
  Theme,
  Tabs,
  Tab,
  CircularProgress,
} from '@material-ui/core';

import { PaperWithTabsProps } from 'components/PaperWithTabs/types';

const tabHeight = '30px';
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  wrapper: {
    width: '100%',
    display: 'table',
    position: 'relative',
  },
  progress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  actions: {
    display: 'grid',
    justifyItems: 'right',
  },
  actionsInnerWrapper: {
    display: 'flex',
  },
  action: {
    marginLeft: theme.spacing(2),
  },
  footer: {
    marginTop: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
  },
  footerText: {
    display: 'grid',
    alignItems: 'center',
  },
  head: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridGap: theme.spacing(2),
  },
  tabsRoot: {
    minHeight: tabHeight,
    height: tabHeight,
  },
  tabRoot: {
    minHeight: tabHeight,
    height: tabHeight,
    minWidth: 100,
  },
}));

const PaperWithTabs = (props: PaperWithTabsProps) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { title, children, loading, actions, footer, tabs, ...rest } = props;

  const mappedTabs = props.tabs.map(tab => (
    <Tab
      disabled={tab.disabled}
      key={`tab${tab.label}`}
      label={tab.label}
      classes={{
        root: classes.tabRoot,
      }}
    />
  ));

  const mappedPanels = tabs.map((tab, index) => (
    <div key={`tabPanel${tab.label}`}>{index === value && <>{tab.panel}</>}</div>
  ));

  return (
    <div className={`${classes.wrapper} `}>
      <PaperPrefab className={classes.paper} elevation={2} {...rest}>
        <div className={classes.head}>
          {title && (
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
          )}
          <div>
            <Tabs
              value={value}
              onChange={(e, v) => setValue(v)}
              classes={{
                root: classes.tabsRoot,
              }}
              variant="scrollable"
              scrollButtons="auto"
            >
              {mappedTabs}
            </Tabs>
          </div>
        </div>
        {mappedPanels}
        {children}
        {(actions || footer) && (
          <div className={classes.footer}>
            <div className={classes.footerText}>{footer}</div>
            <div className={classes.actions}>
              <div className={classes.actionsInnerWrapper}>
                {actions &&
                  actions.map((a, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className={classes.action}>
                      {a}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </PaperPrefab>
      {loading && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
};

export default PaperWithTabs;
