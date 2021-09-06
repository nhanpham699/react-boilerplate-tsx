import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface CustomerState {
  customers: {
    total: number,
    list: [],
    currentPage: number,
    offset: number,
    rows: number,
    totalPage: number,
  }
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = CustomerState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
