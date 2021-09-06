import { action } from 'typesafe-actions';
import ActionTypes from './constants';

interface User {
  username: string,
  password: string
}

interface UserResponse {
  id: string,
  createdTime: string,
  updatedTime: string,
  username: string,
  realname: string,
  headImg: string,
  mobile: string,
  email: string,
  num: string,
  sex: number,
  statuz: number,
  deptId: string,
  job: string,
  parentId: string,
  token: string,
  roles: [],
}

export const userLogInRequest = (user: User) => 
  action(ActionTypes.LOGIN_REQUEST, user);

export const userLogInSuccess = (user: UserResponse) =>
  action(ActionTypes.LOGIN_SUCCESS, user);
export const userLogInFailed = () => action(ActionTypes.LOGIN_FAILED);

export const LogOut = () => action(ActionTypes.LOGOUT);
