import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */

interface UserState {
  user: object
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type ContainerState = UserState;
type ContainerActions = AppActions;

export { ContainerState, ContainerActions };
