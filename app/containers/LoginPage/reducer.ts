import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';
import axios from 'axios';
// The initial state of the App
export const initialState: ContainerState = {
  user: {},
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function loginReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return { user: action.payload }
    default:
      return state;
  }
}

export default loginReducer;