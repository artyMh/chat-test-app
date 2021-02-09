import i18next from 'i18next';
import { WS_CONNECT, WS_DISCONNECT, WS_SEND_MESSAGE } from '../constants';
import { addNotification, webSocketConnected, receivedMessageToChatWebSocket, webSocketDisconnected } from '../actions/main';
import ChatWebSocket from '../../services/chat-web-socket';
import WsCloseCode from '../../types/websocket-close-codes';

const { location: { protocol, hostname } } = window;
const url = `${(protocol === 'https:' ? 'wss' : 'ws')}://${hostname}:3030`;

let chatWs = null;

const wsOnError = (dispatch) => {
  return (event) => {
    dispatch(addNotification({ type: 'danger', message: 'websocket error' }));
  };
};

const onMessage = (dispatch) => {
  return (event) => {
    console.log('WS message:', event)
    const parsed = JSON.parse(event.data)
    dispatch(receivedMessageToChatWebSocket(parsed.data));
  };
};

const onClose = (dispatch) => {
  return (event) => {
      const { wasClean, code } = event;
      dispatch(webSocketDisconnected());

      if (code === WsCloseCode.ABNORMAL_CLOSURE) {
        dispatch(addNotification({ type: 'danger', message: i18next.t('errors.serverUnavailable') }));
      } else if (wasClean) {

        switch (code) {
          case WsCloseCode.NORMAL_CLOSURE:
          case WsCloseCode.NO_STATUS_RECEIVED:
            dispatch(addNotification({ type: 'info', message: i18next.t('errors.disconnected') }));
            break;

          case WsCloseCode.NICKNAME_ALREADY_RESERVED:
            dispatch(addNotification({ type: 'warning', message: i18next.t('errors.nicknameTaken') }));
            break;

          case WsCloseCode.NICKNAME_SHOULD_BE_REGISTERED:
            dispatch(addNotification({ type: 'danger', message: i18next.t('errors.needToRegister') }));
            break;

          case WsCloseCode.USER_SILENT_TOO_LONG:
            dispatch(addNotification({ type: 'info', message: i18next.t('errors.disconnectedDueInactive') }));
            break;

          case WsCloseCode.SERVER_SHUTTING_DOWN:
            dispatch(addNotification({ type: 'danger', message: i18next.t('errors.serverShuttingDown') }));
            break;

          default:
            break;
        }
      }
  };
};

const onOpen = (dispatch) => {
  return () => {
    dispatch(webSocketConnected())
    chatWs.registerUser()
  };
};

const chatWebSocketMiddleware = ({ dispatch, getState }) => next => action => {
  console.log('Middleware:', action)
  const { main: { nickname } } = getState()

  switch (action.type) {
    case WS_CONNECT: {
      chatWs = new ChatWebSocket(url, nickname, {
        onerror: wsOnError(dispatch),
        onmessage: onMessage(dispatch),
        onclose: onClose(dispatch),
        onopen: onOpen(dispatch)
      });
      chatWs.connect();
      break
    }

    case WS_SEND_MESSAGE: {
      chatWs.send(action.payload);
      action.payload = {
        message: action.payload.data.message,
        type: 'user',
        nickname,
        timestamp: Date.now()
      };
      break
    }

    case WS_DISCONNECT: {
      chatWs.close()
      break
    }
  }

  next(action)
};

export default chatWebSocketMiddleware
