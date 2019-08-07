import { WsMessageCodes } from "../enums/ws-message-codes";

interface IParsedMessage {
  code: WsMessageCodes;
  data: {
    nickname?: string;
  };
}

export class WsMessage {
  public readonly message: any;

  public readonly parsedMessage: IParsedMessage;

  public readonly isValid: boolean;

  public readonly code: WsMessageCodes;

  public readonly data: any;

  constructor(message: any) {
    this.message = message;

    try {
      this.parsedMessage = JSON.parse(message);
      this.isValid = this._basicValidation();
    } catch (e) {
      throw new Error("Error while parsing or validating message from JSON format!");
    }

    this.code = this.parsedMessage.code;
    this.data = this.parsedMessage.data;
  }

  public isRegistration(): boolean {
    const { code, data } = this.parsedMessage;

    if (code !== WsMessageCodes.REGISTER_USER || typeof(data.nickname) === "undefined" || data.nickname === null) {
      return false;
    }

    return true;
  }

  private _basicValidation(): boolean {
    if (typeof(this.parsedMessage.code) === "undefined" || this.parsedMessage.code === null) {
      return false;
    }

    if (typeof(this.parsedMessage.data) === "undefined" || this.parsedMessage.data === null) {
      return false;
    }

    return true;
  }
}
