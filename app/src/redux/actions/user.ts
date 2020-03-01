import { UserReducer } from 'redux/reducers/user/types';
import userActionTypes from 'redux/reducers/user/actionTypes';

export const userChange = (user: UserReducer) => ({ type: userActionTypes.change, user });
