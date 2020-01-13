import * as Actions from '../constants';

export const initialState = {
  nickname: '',
  notifications: [
    // { type: 'danger', message: 'Failed to connect. Nickname already taken.' },
    // { type: 'danger', message: 'Server unavailable.' },
    // { type: 'warning', message: 'Disconnected by the server due to inactivity' },
  ],
};

export default function reducer(inputState = initialState, action) {
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

    default:
      return inputState;
  }
}
