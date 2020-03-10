const routes = {
  login: '/login',
  dashboard: '/dashboard',
  roles: {
    index: '/roles',
    resourceDetail: '/roles/resourceDetail',
    resourceCategoryDetail: '/roles/resourceCategoryDetail',
    roleDetail: '/roles/roleDetail',
    addRole: '/roles/addRole',
  },
  users: {
    index: '/users',
    userDetail: '/users/userDetail',
    addUser: '/users/addUser',
  },
  profile: { index: '/profile', changePassword: '/profile/changePassword' },
};

export default routes;
