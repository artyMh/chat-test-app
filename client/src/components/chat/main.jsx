import React, { Fragment } from 'react';
import moment from 'moment';
import connect from '../../decorators/connect';
import { addNotification } from '../../redux/actions/main';
import Routes from '../../routing/routes';
import WsCloseCode from '../../enums/websocket-close-codes';
import WsMessageCode from '../../enums/websocket-messages-codes';
import ChatMessage from './message';
import ChatMessageForm from './chat-message-form';

@connect({
  state: (state) => ({
    nickname: state.main.nickname
  }),
  actions: (dispatch) => ({
    addNotification: (notification) => dispatch(addNotification(notification)),
    clearNotifications: () => dispatch(clearNotifications())
  })
})
export default class Chat extends React.PureComponent {

  chatWebSocket = null;

  state = {
    wsOpened: false,
    messages: []
  };

  submitMessage = (message) => {
    const { nickname } = this.props;

    const msg = {
      code: WsMessageCode.CHAT_MESSAGE,
      data: { message }
    };

    // Yea, this is bad, I should check out if message has been
    // processed without any errors and pushed to other users.
    // But, I think that this logic going out of test excersise.
    const msgToChat = {
      type: 'user',
      nickname,
      message,
      timestamp: Date.now()
    };

    this.setState((prevState) => ({
      messages: [ ...prevState.messages, msgToChat ]
    }));
    this.chatWebSocket.send(JSON.stringify(msg));
  }

  disconnectWs = () => {
    this.chatWebSocket.close();
    this.props.history.push(Routes.HOME);
  }

  _connectToWebSocket() {
    const { location: { protocol, hostname } } = window;
    const { nickname, addNotification, history } = this.props;

    this.chatWebSocket = new WebSocket(`${(protocol === 'https:' ? 'wss' : 'ws')}://${hostname}:3030`);

    this.chatWebSocket.onopen = (event) => {
      console.log('SOCKET OPENED');
      this.setState({ wsOpened: true });

      // Trying to register with current nickname
      const data = {
        code: WsMessageCode.REGISTER_USER,
        data: { nickname }
      };
      console.log('sending register request', data);
      this.chatWebSocket.send(JSON.stringify(data));
    };

    this.chatWebSocket.onclose = (event) => {
      console.log('SOCKET CLOSED!', event);
      const { wasClean, code } = event;

      if (code === WsCloseCode.ABNORMAL_CLOSURE) {
        addNotification({ type: 'danger', message: 'Server unavailable.' });
      } else if (wasClean) {

        switch (code) {
          case WsCloseCode.NORMAL_CLOSURE:
          case WsCloseCode.NO_STATUS_RECEIVED:
            addNotification({ type: 'danger', message: 'Disconnected from the server.' });
            break;

          case WsCloseCode.NICKNAME_ALREADY_RESERVED:
            addNotification({ type: 'danger', message: 'Nickname already taken.' });
            break;

          case WsCloseCode.NICKNAME_SHOULD_BE_REGISTERED:
            addNotification({ type: 'danger', message: 'You should register yourself with nickname before messaging.' });
            break;

          case WsCloseCode.USER_SILENT_TOO_LONG:
            addNotification({ type: 'warning', message: 'You has been disconnected due to you were silent too long.' });
            break;

          case WsCloseCode.SERVER_SHUTTING_DOWN:
            addNotification({ type: 'danger', message: 'Server shutting down.' });
            break;

          default:
            break;
        }
      }
      
      history.push(Routes.HOME);
    };

    this.chatWebSocket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log('SOCKET NEW MESSAGE!', msg);
      this.setState((prevState) => ({
        messages: [ ...prevState.messages, msg.data ]
      }));
    };

    this.chatWebSocket.onerror = (event) => {
      console.log('SOCKET ON ERROR', event);
    };
  }

  _renderLoader() {
    return (
      <div className="spinner-border text-primary" role="status"></div>
    );
  }

  _renderChat() {
    const { nickname } = this.props;
    const { messages } = this.state;

    return (
      <Fragment>
        <h1 className="h3 mb-3 font-weight-normal mt-4">Connected as <span className="badge badge-dark">@{nickname}</span></h1>
        <button type="button" className="btn btn-danger" onClick={this.disconnectWs}>Disconnect</button>
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">Recent messages</h6>
          {messages.map((msg, index) => 
            <ChatMessage
              key={index}
              type={msg.type}
              nickname={msg.nickname}
              message={msg.message}
              date={moment(msg.timestamp).format('YYYY-MM-DD HH:mm:ss')}
              isYourself={msg.nickname === nickname}
            />
          )}
        </div>
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <ChatMessageForm submitMessage={this.submitMessage}/>
        </div>
      </Fragment>
    );
  }

  componentDidMount() {
    const { nickname, addNotification, history } = this.props;

    if (!nickname) {
      addNotification({
        type: 'danger',
        message: 'You din\'t entered your nickname.'
      });
      history.push(Routes.HOME);
    } else {
      this._connectToWebSocket();
    }
  }

  componentWillUnmount() {
    const { readyState } = this.chatWebSocket;
    
    // Closing only if socket have connection or connects with server
    if (readyState === WebSocket.CONNECTING && readyState !== WebSocket.OPEN) {
      console.log('Closing socket because it is open');
      this.chatWebSocket.close();
    }
  }

  render() {
    const { wsOpened } = this.state;

    return (
      <div className="row justify-content-sm-center">
        <div className="col-sm-12 col-md-6 text-center mt-3 mb-3">
          {wsOpened ? this._renderChat() : this._renderLoader()}
        </div>
      </div>
    );
  }
}
