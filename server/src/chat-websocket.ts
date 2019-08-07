import * as WebSocket from "ws";
import { WsCloseCodes, WsMessageCodes, ChatMessageType } from "./enums";
import { WsMessage, IChatMessage, IConfig } from "./models";
import UsersStore from "./users-nickname-store";

interface IClientWebSocket extends WebSocket {
  isAlive: boolean;
  registered: boolean;
  nickname: string;
  lastMessageTime: number;
}

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

export class ChatWebSocket {

  public readonly CONFIG: IConfig;

  private readonly wss: WebSocket.Server;

  private readonly usersStore: UsersStore;

  private lastInteractionInterval: NodeJS.Timer;

  constructor() {
    this.CONFIG = {
      PORT: Number(process.env.PORT) || 3030,
      LAST_MSG_MAX_TIMEOUT: Number(process.env.LAST_MSG_CHECK_INTERVAL) || 30000,
      LAST_MSG_CHECK_INTERVAL: Number(process.env.LAST_MSG_CHECK_INTERVAL) || 10000,
    };
    this.wss = new WebSocket.Server({ port: this.CONFIG.PORT, clientTracking: true });
    this.usersStore = new UsersStore();

    this._initEventHandlers();
    this._initInactivityInterval();
    this._setGracefullTimeout();
  }

  private _sendToAll(ws: IClientWebSocket, data: IChatMessage): void {
    const msg = JSON.stringify(data);
    this.wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  }

  private _processNotRegistered(ws: IClientWebSocket, msg: any): void {
    // And first message isn't registration message - close connection
    if (!msg.isRegistration()) {
      console.log("First user message isn\'t registration, disconnecting client ...");
      ws.close(WsCloseCodes.NICKNAME_SHOULD_BE_REGISTERED, "");
    } else {
      const { data: { nickname } } = msg;

      // If username already taken - close connection
      if (this.usersStore.userExist(nickname)) {
        console.log(`User with '${nickname}' nickname already exists, disconnecting client ...`);
        ws.close(WsCloseCodes.NICKNAME_ALREADY_RESERVED, "");
      } else {
        // Otherwise continue with registration
        this.usersStore.saveUser(nickname);
        ws.registered = true;
        ws.nickname = nickname;
        const message: IChatMessage = {
          code: WsMessageCodes.CHAT_MESSAGE,
          data: {
            type: ChatMessageType.CHAT,
            message: `"${nickname}" joined to chat!`,
            timestamp: Date.now(),
          },
        };
        this._sendToAll(ws, message);
        console.log(`'${nickname}' registered`);
      }
    }
  }

  private _initEventHandlers(): void {
    this.wss.on("listening", () => {
      console.log("Start to listening!");
    });

    this.wss.on("close", () => {
      console.log("Server closing!");
      this.wss.clients.forEach((client) => client.close(WsCloseCodes.SERVER_SHUTTING_DOWN, ""));
    });

    this.wss.on("connection", (ws: IClientWebSocket) => {
      console.log("New client connected");
      ws.registered = false;
      ws.nickname = "";
      ws.isAlive = true;
      ws.lastMessageTime = Date.now();

      ws.on("pong", heartbeat);

      ws.on("message", (data: any) => {
        let msg;
        try {
          msg = new WsMessage(data);
        } catch (e) {
          console.log("Error while processing message from user, disconnecting client ...", e);
          ws.close();
          return;
        }

        if (!ws.registered) {
          this._processNotRegistered(ws, msg);
        } else {
          console.log(`'${ws.nickname}' sent message ->`, data);
          const currentTimestamp = Date.now();
          const message: IChatMessage = {
            code: WsMessageCodes.CHAT_MESSAGE,
            data: {
              type: ChatMessageType.USER,
              nickname: ws.nickname,
              message: msg.data.message,
              timestamp: currentTimestamp,
            },
          };

          ws.lastMessageTime = currentTimestamp;
          this._sendToAll(ws, message);
        }
      });

      ws.on("error", (data) => {
        console.log("WS error event", data);
      });

      ws.on("close", () => {
        if (ws.registered) {
          this.usersStore.deleteUser(ws.nickname);
          const message: IChatMessage = {
            code: WsMessageCodes.CHAT_MESSAGE,
            data: {
              type: ChatMessageType.CHAT,
              message: `"${ws.nickname}" disconnected`,
              timestamp: Date.now(),
            },
          };
          console.log(`'${ws.nickname}' closing connection, deleted from users store to free nickname, sent info message to all`);
          this._sendToAll(ws, message);
        }
      });
    });
  }

  private _initInactivityInterval(): void {
    // Check for lost connections and last messages
    this.lastInteractionInterval = setInterval(() => {
      this.wss.clients.forEach((ws: IClientWebSocket) => {
        if (!ws.isAlive) {
          const message: IChatMessage = {
            code: WsMessageCodes.CHAT_MESSAGE,
            data: {
              type:  ChatMessageType.CHAT,
              message: `"${ws.nickname}" lost connection.`,
              timestamp: Date.now(),
            },
          };
          this._sendToAll(ws, message);
          console.log(`'${ws.nickname}' lost connection, disconnecting ...`);
          return ws.terminate();
        }

        const timeDifference = Date.now() - ws.lastMessageTime;

        if (timeDifference >= this.CONFIG.LAST_MSG_MAX_TIMEOUT) {
          this.usersStore.deleteUser(ws.nickname);
          const message: IChatMessage = {
            code: WsMessageCodes.CHAT_MESSAGE,
            data: {
              type: ChatMessageType.CHAT,
              message: `"${ws.nickname}" disconnected due being silent too long!`,
              timestamp: Date.now(),
            },
          };
          console.log(`'${ws.nickname}' closing connection due, deleted from users store to free nickname, sent info message to all`);
          this._sendToAll(ws, message);
          ws.registered = false;
          ws.close(WsCloseCodes.USER_SILENT_TOO_LONG, "");
        }

        ws.isAlive = false;
        ws.ping(noop);
      });
    }, this.CONFIG.LAST_MSG_CHECK_INTERVAL);
  }

  private _setGracefullTimeout(): void {
    const sigs = ["SIGINT", "SIGTERM", "SIGQUIT"];
    sigs.forEach((sig) => {
      (process as NodeJS.EventEmitter).on(sig, () => {
        clearInterval(this.lastInteractionInterval);
        this.wss.close();
      });
    });
  }
}
