const hasResources = (userResources: string[], requiredResources: string[][]) => {
  let hasAccess = true;
  requiredResources.forEach(resources => {
    const requiredResourcesObject = {};

    resources.forEach(resource => {
      requiredResourcesObject[resource] = false;
    });

    userResources.forEach(resource => {
      if (requiredResourcesObject[resource] !== undefined) {
        requiredResourcesObject[resource] = true;
      }
    });

    let hasPartialAccess = true;

    Object.keys(requiredResourcesObject).forEach(resource => {
      if (!requiredResourcesObject[resource]) {
        hasPartialAccess = false;
      }
    });
    if (!hasPartialAccess) hasAccess = false;
  });

  return hasAccess;
};

export default hasResources;
