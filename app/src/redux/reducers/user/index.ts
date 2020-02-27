import { UserReducer } from './types';

const initState: UserReducer = {
  id: null,
  email: null,
  name: null,
  surname: null,
  roles: [],
};

const userReducer = (s = initState, action) => {
  const { type } = action;

  const state = { ...s };

  if (type === 'USER_CHANGE') {
    return { ...state, ...action.user };
  }
  return state;
};

export default userReducer;
