import { ChangedResource, RolesReducer } from './types';

const initState: RolesReducer = { resources: [], roles: [], changedResources: [] };

const rolesReducer = (s = initState, action) => {
  const { type } = action;

  const state = { ...s };

  if (type === 'ROLES_CHANGE_RESOURCES') {
    return { ...state, resources: action.resources };
  }
  if (type === 'ROLES_CHANGE_ROLES') {
    return { ...state, roles: action.roles };
  }
  if (type === 'ROLE_ADD_CHANGED_RESOURCE') {
    const { changedResource }: { changedResource: ChangedResource } = action;
    const oldResource = state.changedResources.findIndex(
      r => r.resourceId === changedResource.resourceId && r.roleId === changedResource.roleId,
    );
    if (oldResource >= 0) {
      state.changedResources.splice(oldResource, 1);
    }
    state.changedResources.push(changedResource);
    return { ...state };
  }
  return state;
};

export default rolesReducer;
