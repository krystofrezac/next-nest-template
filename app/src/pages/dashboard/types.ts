import { User } from 'redux/reducers/user/types';

export interface MapState {
  user: User;
}

export interface DashboardIndexProps extends MapState {}

export interface DashboardProps {
  user: User;
}
