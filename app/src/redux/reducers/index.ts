import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = (state = { foo: '' }, action) => {
  switch (action.type) {
    case 'FOO':
      return { ...state, foo: action.payload };
    default:
      return state;
  }
};

const makeStore = initialState => {
  let store;

  if (process.browser) {
    const persistConfig = {
      key: 'root',
      storage,
    };

    store = createStore(persistReducer(persistConfig, rootReducer), initialState);
    // eslint-disable-next-line no-underscore-dangle
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(rootReducer, initialState);
  }
  return store;
};

export default makeStore;
