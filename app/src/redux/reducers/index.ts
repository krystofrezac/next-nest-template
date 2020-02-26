import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from './user';

const appReducer = combineReducers({
  user,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const makeStore = () => {
  let store;

  if (process.browser) {
    const persistConfig = {
      key: 'root',
      storage,
    };

    store = createStore(persistReducer(persistConfig, rootReducer));
    // eslint-disable-next-line no-underscore-dangle
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(rootReducer);
  }
  return store;
};

export default makeStore;
