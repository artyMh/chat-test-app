import * as Actions from '../constants';

export const initialState = {
  nickname: '',
  notifications: [],
  chatWebSocket: {
    connectionState: '',
    chatMessages: [],
  }
};

export default function reducer(inputState = initialState, action) {
  console.log('Reducer:', action)
  switch (action.type) {
    
    case Actions.SET_INITIAL_STATE:
      return { ...inputState, ...action.payload };

    case Actions.SET_NICKNAME:
      return { ...inputState, nickname: action.payload };

    case Actions.CLEAR_STORE_DATA:
      return { ...initialState };

    case Actions.ADD_NOTIFICATION:
      return { ...inputState, notifications: [...inputState.notifications, action.payload] };

    case Actions.CLEAR_NOTIFICATIONS:
      return { ...inputState, notifications: [] };

    case Actions.WS_CONNECT:
      return {
        ...inputState,
        chatWebSocket: {
          connectionState: 'CONNECTING'
        }
      }

    case Actions.WS_DISCONNECT:
      return {
        ...inputState,
        chatWebSocket: {
          connectionState: ''
        }
      }

    case Actions.WS_DISCONNECTED:
      return {
        ...inputState,
        chatWebSocket: {
          connectionState: ''
        }
      }

    case Actions.WS_CONNECT_SUCCESS:
      return {
        ...inputState,
        chatWebSocket: {
          connectionState: 'CONNECTED',
          chatMessages: [
            { type: 'chat', timestamp: Date.now(), message: 'Write something!'}
          ]
        }
      }

    case Actions.WS_SEND_MESSAGE:
        return {
          ...inputState,
          chatWebSocket: {
            ...inputState.chatWebSocket,
            chatMessages: [...inputState.chatWebSocket.chatMessages, action.payload]
          }
        }

      case Actions.WS_RECEIVE_MESSAGE:
          return {
            ...inputState,
            chatWebSocket: {
              ...inputState.chatWebSocket,
              chatMessages: [...inputState.chatWebSocket.chatMessages, action.payload]
            }
          }

    default:
      return inputState;
  }
}
