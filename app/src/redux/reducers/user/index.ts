const initState = {
  id: null,
  email: null,
  name: null,
  surname: null,
  roles: [],
};

const userReducer = (state = initState, action) => {
  const { type } = action;

  if (type === 'USER_CHANGE') {
    return { ...state, ...action.user };
  }
  return state;
};

export default userReducer;
