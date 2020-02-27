import React, { useState } from 'react';

import { makeStyles, Paper as PaperPrefab, Typography, Theme, Tabs, Tab } from '@material-ui/core';

import { PaperWithTabsProps } from 'components/PaperWithTabs/types';

const tabHeight = '30px';
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
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
    width: 0,
  },
}));

const PaperWithTabs = (props: PaperWithTabsProps) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { title, children, ...rest } = props;

  const mappedTabs = props.tabs.map(tab => (
    <Tab
      key={`tab${tab.label}`}
      label={tab.label}
      classes={{
        root: classes.tabRoot,
      }}
    />
  ));

  const mappedPanels = props.tabs.map((tab, index) => (
    <div key={`tabPanel${tab.label}`}>{index === value && <>{tab.Panel}</>}</div>
  ));

  return (
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
          >
            {mappedTabs}
          </Tabs>
        </div>
      </div>
      {mappedPanels}
      {children}
    </PaperPrefab>
  );
};

export default PaperWithTabs;
