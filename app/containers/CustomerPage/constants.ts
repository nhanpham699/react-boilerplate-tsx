/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

enum ActionTypes {
  CUSTOMER_REQUEST = "customer_request",
  CUSTOMER_RESPONSE = "customer_response",
  CUSTOMER_FAILED = "customer_failed",
  ADD_CUSTOMER = "add_customer",
}

export default ActionTypes;
