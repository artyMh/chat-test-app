import { WsMessageCodes, ChatMessageType } from "../enums";

export interface IChatMessage {
  code: WsMessageCodes;
  data: {
    type: ChatMessageType;
    nickname?: string;
    message: string;
    timestamp: number
  };
}
