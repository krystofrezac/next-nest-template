import { UserReducer } from 'redux/reducers/user/types';

export const userChange = (user: UserReducer) => ({ type: 'USER_CHANGE', user });
