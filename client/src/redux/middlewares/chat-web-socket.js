import i18next from 'i18next';
import { WS_CONNECT, WS_DISCONNECT, WS_SEND_MESSAGE } from '../constants';
import { addNotification, addChatMessage } from '../actions/main';
import ChatWebSocket from '../../services/chat-web-socket';
import WsCloseCode from '../../types/websocket-close-codes';
const { location: { protocol, hostname } } = window;
const url = `${(protocol === 'https:' ? 'wss' : 'ws')}://${hostname}:3030`;

let chatWs = null;

const wsOnError = (dispatch) => {
  return (event) => {
    dispatch(addNotification({ type: 'asd', message: 'asdasd' }));
  };
};

const onMessage = (dispatch) => {
  return (event) => {
    dispatch(addChatMessage({ type: '', nickname: '', message: '', timestamp: 123123123123 }));
  };
};

const onClose = (dispatch) => {
  return (event) => {
    console.log('SOCKET CLOSED!', event);
      const { wasClean, code } = event;

      if (code === WsCloseCode.ABNORMAL_CLOSURE) {
        dispatch(addNotification({ type: 'danger', message: i18next.t('errors.serverUnavailable') }));
      } else if (wasClean) {

        switch (code) {
          case WsCloseCode.NORMAL_CLOSURE:
          case WsCloseCode.NO_STATUS_RECEIVED:
            dispatch(addNotification({ type: 'danger', message: i18next.t('errors.disconnected') }));
            break;

          case WsCloseCode.NICKNAME_ALREADY_RESERVED:
            dispatch(addNotification({ type: 'danger', message: i18next.t('errors.nicknameTaken') }));
            break;

          case WsCloseCode.NICKNAME_SHOULD_BE_REGISTERED:
            dispatch(addNotification({ type: 'danger', message: i18next.t('errors.needToRegister') }));
            break;

          case WsCloseCode.USER_SILENT_TOO_LONG:
            dispatch(addNotification({ type: 'warning', message: i18next.t('errors.disconnectedDueInactive') }));
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
  return (event) => {
    console.log('SOCKET OPENED, Trying to register');
    chatWs.registerUser();
  };
};

const chatWebSocketMiddleware = ({ dispatch, getState }) => next => action => {
  console.log('Middleware triggered:', dispatch, action);
  const { nickname } = getState();

  switch (action.type) {
    case WS_CONNECT: {
      chatWs = new ChatWebSocket(url, nickname, {
        onerror: wsOnError(dispatch),
        onmessage: onMessage(dispatch),
        onclose: onClose(dispatch),
        onopen: onOpen(dispatch)
      });
      chatWs.connect();
      break;
    }

    case WS_SEND_MESSAGE: {
      chatWs.send(action.payload);
      break;
    }

    case WS_DISCONNECT: {
      chatWs.close();
      break;
    }
  }

  next(action);
};

export default chatWebSocketMiddleware;
