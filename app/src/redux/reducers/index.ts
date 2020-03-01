import { combineReducers, createStore } from 'redux';

import user from './user';
import roles from './roles';

const appReducer = combineReducers({
  user,
  roles,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const makeStore = () => {
  let store;

  if (process.browser) {
    store = createStore(rootReducer);
  } else {
    store = createStore(rootReducer);
  }
  return store;
};

const store = makeStore();

export default store;
