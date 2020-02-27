const hasResources = (userResources: string[], requiredResources: string[]) => {
  const requiredResourcesObject = {};

  requiredResources.forEach(resource => {
    requiredResourcesObject[resource] = false;
  });

  userResources.forEach(resource => {
    if (requiredResourcesObject[resource] !== undefined) {
      requiredResourcesObject[resource] = true;
    }
  });

  let hasAccess = true;

  Object.keys(requiredResourcesObject).forEach(resource => {
    if (!requiredResourcesObject[resource]) {
      hasAccess = false;
    }
  });
  return hasAccess;
};

export default hasResources;
