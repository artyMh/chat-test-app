import WsMessageCode from '../types/websocket-messages-codes';

class ChatWebSocket {
  url = '';
  nickname = '';
  events = {
    onopen: () => {},
    onclose: () => {},
    onmessage: () => {},
    onerror: () => {},
  };

  _ws = null;

  constructor(url, nickname, events) {
    this.url = url;
    this.nickname = nickname;
    this.events = events;
  }

  connect() {
    this._ws = new WebSocket(this.url);
    this._setUpEventsHandlers();
  }

  close() {
    this._ws.close();

     // Destroy on close?
     this._ws = null;
  }

  send(data) {
    // check for valid data!
    this._ws.send(JSON.stringify(data));
  }

  registerUser() {
    const data = {
      code: WsMessageCode.REGISTER_USER,
      data: { nickname }
    };
    console.log('sending register request', data);
    this.send(JSON.stringify(data));
  }

  _setUpEventsHandlers() {
    this._ws.onopen = this.events.onopen;
    this._ws.onclose = this.events.onclose;
    this._ws.onmessage = this.events.onmessage;
    this._ws.onerror = this.events.onerror;
  }
};

export default new ChatWebSocket;
