import * as Actions from '../constants';

/**
 * Action for setting initial state
 * @param {Object} state initial state of a store
 * @return {Object} declared action
 */
export function setInitialState(state) {
  return {
    type: Actions.SET_INITIAL_STATE,
    payload: state,
  };
}

/**
 * Action for clearing store data and setting to initial store
 * @return {Object} declared action
 */
export function clearStoreData() {
  return {
    type: Actions.CLEAR_STORE_DATA,
  };
}

/**
 * Action for setting user desired nickname
 * @return {Object} declared action
 */
export function setNickname(nickname) {
  return {
    type: Actions.SET_NICKNAME,
    payload: nickname
  };
}

/**
 * Action for adding new notification
 * @return {Object} declared action
 */
export function addNotification(notification) {
  return {
    type: Actions.ADD_NOTIFICATION,
    payload: notification
  };
}

/**
 * Action for clearing all notifications
 * @return {Object} declared action
 */
export function clearNotifications() {
  return {
    type: Actions.CLEAR_NOTIFICATIONS
  };
}