import { combineReducers, createStore } from 'redux';

import roles from './roles';

const appReducer = combineReducers({
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
