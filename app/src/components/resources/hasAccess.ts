const hasAccess = (userResources: string[], requiredResources: string[][]) => {
  let access = false;
  if (requiredResources.length === 0) return true;

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
    if (hasPartialAccess) access = true;
  });

  return access;
};

export default hasAccess;
