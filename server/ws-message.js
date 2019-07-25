const WsMessageCodes = require('./enums/ws-message-codes').WsMessageCodes;

class WsMessage {
  constructor(message) {
    this.message = message;

    try {
      this.parsedMessage = JSON.parse(message);
      this.isValid = this._basicValidation();
    } catch (e) {
      throw new Error('Error while parsing or validating message from JSON format!', message, e);
    }

    this.code = this.parsedMessage.code;
    this.data = this.parsedMessage.data;

    this.isRegistration = this.isRegistration.bind(this);
    this._basicValidation = this._basicValidation.bind(this);
  }

  _basicValidation() {
    if (typeof(this.parsedMessage.code) === 'undefined' || this.parsedMessage.code === null) {
      return false;
    }
  
    if (typeof(this.parsedMessage.data) === 'undefined' || this.parsedMessage.data === null) {
      return false
    }

    return true;
  }

  isRegistration() {
    const { code, data } = this.parsedMessage;
    
    if (code !== WsMessageCodes.REGISTER_USER || typeof(data.nickname) === 'undefined' || data.nickname === null) {
      return false;
    }

    return true;
  }
}

exports.WsMessage = WsMessage;
