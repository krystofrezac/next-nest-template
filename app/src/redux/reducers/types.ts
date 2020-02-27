import { RolesReducer } from 'redux/reducers/roles/types';
import { UserReducer } from './user/types';

export interface State {
  user: UserReducer;
  roles: RolesReducer;
}
