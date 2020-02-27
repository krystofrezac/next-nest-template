import { UserReducer } from 'redux/reducers/user/types';

export interface MapState {
  user: UserReducer;
}

export interface DashboardIndexProps extends MapState {}

export interface DashboardProps {
  user: UserReducer;
}
