import * as Actions from '../constants';

/**
 * Action for setting initial state
 * @param {Object} state initial state of a store
 * @return {Object} declared action
 */
export function setInitialState(state) {
  return {
    type: Actions.SET_INITIAL_STATE,
    payload: state
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
 * @param {string} nickname user nickname
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

/**
 * Action for setting up chat web socket connection
 * @return {Object} declared action
 */
export function connectToChatWebSocket() {
  return {
    type: Actions.WS_CONNECT
  };
}

/**
 * Action for disconnecting from chat web socket connection
 * @return {Object} declared action
 */
export function disconnectFromChatWebSocket() {
  return {
    type: Actions.WS_DISCONNECT
  };
}

/**
 * Action for setting web socket connection status to connected
 * @return {Object} declared action
 */
export function webSocketConnected() {
  return {
    type: Actions.WS_CONNECT_SUCCESS
  };
}

/**
 * Action for sending message to websocket
 * @param {Object} message chat message
 * @return {Object} declared action
 */
export function sendMessageToChatWebSocket(message) {
  return {
    type: Actions.WS_SEND_MESSAGE,
    payload: message
  };
}

/**
 * Action for receive message from socket
 * @param {Object} message chat message
 * @return {Object} declared action
 */
export function receivedMessageToChatWebSocket(message) {
  return {
    type: Actions.WS_RECEIVE_MESSAGE,
    payload: message
  };
}