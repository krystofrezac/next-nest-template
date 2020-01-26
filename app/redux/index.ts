import { createStore } from 'redux';

const reducer = (state = { foo: '' }, action) => {
  switch (action.type) {
    case 'FOO':
      return { ...state, foo: action.payload };
    default:
      return state;
  }
};

const makeStore = initialState => {
  return createStore(reducer, initialState);
};

export default makeStore;
