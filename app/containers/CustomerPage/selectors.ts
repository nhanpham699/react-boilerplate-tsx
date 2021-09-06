/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectCustomer = (state: ApplicationRootState) => state.customer || initialState;

const makeSelectCustomer = () =>
  createSelector(selectCustomer, substate => substate.customers);

export { selectCustomer, makeSelectCustomer };
