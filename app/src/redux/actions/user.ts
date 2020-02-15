import { User } from 'redux/reducers/user/types';

export const userChange = (user: User) => ({ type: 'USER_CHANGE', user });
