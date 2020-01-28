import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import translate from '../../decorators/translate';
import connect from '../../decorators/connect';
import { addNotification } from '../../redux/actions/main';
import Routes from '../../routing/routes';
import WsCloseCode from '../../types/websocket-close-codes';
import WsMessageCode from '../../types/websocket-messages-codes';
import ChatMessage from './message';
import ChatMessageForm from './chat-message-form';

@translate()
@connect({
  state: (state) => ({
    nickname: state.main.nickname
  }),
  actions: (dispatch) => ({
    addNotification: (notification) => dispatch(addNotification(notification))
  })
})
class Chat extends React.PureComponent {

  static propTypes = {
    history: PropTypes.object.isRequired,
    nickname: PropTypes.string.isRequired,
    addNotification: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  chatWebSocket = null;

  state = {
    wsOpened: false,
    messages: []
  };

  componentDidMount() {
    const { nickname, addNotification, history, t } = this.props;

    if (!nickname) {
      addNotification({
        type: 'danger',
        message: t('errors.emptyNickname')
      });
      history.push(Routes.HOME);
    } else {
      this._connectToWebSocket();
    }
  }

  componentWillUnmount() {
    if (this.chatWebSocket) {
      const { readyState } = this.chatWebSocket;
    
      // Closing only if socket have connection or connects with server
      if (readyState === WebSocket.CONNECTING && readyState !== WebSocket.OPEN) {
        console.log('Closing socket because it is open');
        this.chatWebSocket.close();
      }
    }
  }

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
    const { nickname, addNotification, history, t } = this.props;

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
        addNotification({ type: 'danger', message: t('errors.serverUnavailable') });
      } else if (wasClean) {

        switch (code) {
          case WsCloseCode.NORMAL_CLOSURE:
          case WsCloseCode.NO_STATUS_RECEIVED:
            addNotification({ type: 'danger', message: t('errors.disconnected') });
            break;

          case WsCloseCode.NICKNAME_ALREADY_RESERVED:
            addNotification({ type: 'danger', message: t('errors.nicknameTaken') });
            break;

          case WsCloseCode.NICKNAME_SHOULD_BE_REGISTERED:
            addNotification({ type: 'danger', message: t('errors.needToRegister') });
            break;

          case WsCloseCode.USER_SILENT_TOO_LONG:
            addNotification({ type: 'warning', message: t('errors.disconnectedDueInactive') });
            break;

          case WsCloseCode.SERVER_SHUTTING_DOWN:
            addNotification({ type: 'danger', message: t('errors.serverShuttingDown') });
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
    const { nickname, t } = this.props;
    const { messages } = this.state;

    return (
      <Fragment>
        <h1 className="h3 mb-3 font-weight-normal mt-4">{t('chat.title')} <span className="badge badge-dark">@{nickname}</span></h1>
        <button type="button" className="btn btn-danger" onClick={this.disconnectWs}>{t('chat.disconnectButton')}</button>
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">{t('chat.messagesTitle')}</h6>
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

  render() {
    const { wsOpened } = this.state;

    return (
      <div className="row justify-content-sm-center">
        <div className="col-sm-12 col-md-9 text-center mt-3 mb-3">
          {wsOpened ? this._renderChat() : this._renderLoader()}
        </div>
      </div>
    );
  }
}

export default Chat;
