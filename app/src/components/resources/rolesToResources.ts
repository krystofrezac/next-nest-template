// TODO type
const rolesToResources = roles => {
  const resources = [];
  roles.forEach(role => {
    role.resources.forEach(resource => {
      resources.push(resource.name);
    });
  });
  return resources;
};

export default rolesToResources;
