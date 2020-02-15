import React from 'react';
import { State } from 'redux/reducers/types';
import { connect } from 'react-redux';
import Error from 'next/error';

const mapStateToProps = (state: State) => ({
  userRoles: state.user.roles,
});

const hasResources = (resources: string[], userRoles: { resources: { name: string }[] }[]) => {
  const requestedResources = {};
  resources.forEach(resource => {
    requestedResources[resource] = false;
  });

  userRoles.forEach(role => {
    role.resources.forEach(resource => {
      if (requestedResources[resource.name] !== undefined) {
        requestedResources[resource.name] = true;
      }
    });
  });

  let hasAccess = true;
  Object.keys(requestedResources).forEach(resource => {
    if (!requestedResources[resource]) {
      hasAccess = false;
    }
  });

  return hasAccess;
};

const withResources = (Component: any, resources: string[]) =>
  connect(mapStateToProps)((props: any) => {
    if (hasResources(resources, props.userRoles)) return <Component {...props} />;
    return <Error statusCode={401} title="Na tuto stránku nemáte přístup" />;
  });

export default withResources;
