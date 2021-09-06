import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';
import axios from 'axios';
// The initial state of the App
export const initialState: ContainerState = {
  customers: {
    total: 0,
    list: [],
    currentPage: 0,
    offset: 0,
    rows: 0,
    totalPage: 0,
  },
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function customerReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.CUSTOMER_RESPONSE:
      return { customers: action.payload }
    default:
      return state;
  }
}

export default customerReducer;