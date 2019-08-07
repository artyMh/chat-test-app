import { ChatWebSocket } from "./chat-websocket";

const chatWs = new ChatWebSocket();
// import * as WebSocket from "ws";
// import { WsCloseCodes, WsMessageCodes } from "./enums";
// import { WsMessage } from "./models/ws-message";
// import UsersStore from "./users-nickname-store";

// interface IWebSocket extends WebSocket {
//   isAlive: boolean;
//   registered: boolean;
//   nickname: string;
//   lastMessageTime: number;
// }

// const wss = new WebSocket.Server({ port: 3030, clientTracking: true });
// const usersStore = new UsersStore();

// const config = {
//   LAST_MSG_MAX_TIMEOUT: 30000,
//   LAST_MSG_CHECK_INTERVAL: 10000,
// };

// function noop() {}

// function heartbeat() {
//   this.isAlive = true;
// }

// function sendToAll(ws: IWebSocket, data) {
//   wss.clients.forEach(function each(client) {
//     if (client !== ws && client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   });
// }

// function processNotRegistered(ws: IWebSocket, msg) {
//   // And first message isn't registration message - close connection
//   if (!msg.isRegistration()) {
//     console.log("First user message isn\'t registration, disconnecting client ...");
//     ws.close(WsCloseCodes.NICKNAME_SHOULD_BE_REGISTERED, "");
//   } else {
//     const { data: { nickname } } = msg;

//     // If username already taken - close connection
//     if (usersStore.userExist(nickname)) {
//       console.log(`User with '${nickname}' nickname already exists, disconnecting client ...`);
//       ws.close(WsCloseCodes.NICKNAME_ALREADY_RESERVED, "");
//     } else {
//       // Otherwise continue with registration
//       usersStore.saveUser(nickname);
//       ws.registered = true;
//       ws.nickname = nickname;
//       sendToAll(ws, JSON.stringify({
//         code: WsMessageCodes.CHAT_MESSAGE,
//         data: {
//           type: "chat",
//           message: `"${nickname}" joined to chat!`,
//           timestamp: Date.now(),
//         },
//       }));
//       console.log(`'${nickname}' registered`);
//     }
//   }
// }

// wss.on("listening", () => {
//   console.log("Start to listening!");
// });

// wss.on("close", () => {
//   console.log("Server closing!");
//   wss.clients.forEach((client) => client.close(WsCloseCodes.SERVER_SHUTTING_DOWN, ""));
// });

// wss.on("connection", function connection(ws: IWebSocket) {
//   console.log("New client connected");
//   ws.registered = false;
//   ws.nickname = "";
//   ws.isAlive = true;
//   ws.lastMessageTime = Date.now();

//   ws.on("pong", heartbeat);

//   ws.on("message", function incoming(data) {
//     let msg;
//     try {
//       msg = new WsMessage(data);
//     } catch (e) {
//       console.log("Error while processing message from user, disconnecting client ...", e);
//       ws.close();
//       return;
//     }

//     if (!ws.registered) {
//       processNotRegistered(ws, msg);
//     } else {
//       console.log(`'${ws.nickname}' sent message ->`, data);
//       const currentTimestamp = Date.now();
//       const message = JSON.stringify({
//         code: WsMessageCodes.CHAT_MESSAGE,
//         data: {
//           type: "user",
//           nickname: ws.nickname,
//           message: msg.data.message,
//           timestamp: currentTimestamp,
//         },
//       });

//       ws.lastMessageTime = currentTimestamp;
//       sendToAll(ws, message);
//     }
//   });

//   ws.on("error", function error(data) {
//     console.log("WS error event", data);
//   });

//   ws.on("close", function close(data) {
//     if (ws.registered) {
//       usersStore.deleteUser(ws.nickname);
//       const msg = JSON.stringify({
//         code: WsMessageCodes.CHAT_MESSAGE,
//         data: {
//           type: "chat",
//           message: `"${ws.nickname}" disconnected`,
//           timestamp: Date.now(),
//         },
//       });
//       console.log(`'${ws.nickname}' closing connection, deleted from users store to free nickname, sent info message to all`);
//       sendToAll(ws, msg);
//     }
//   });
// });

// // Check for lost connections and last messages
// const interval = setInterval(function ping() {
//   wss.clients.forEach(function each(ws: IWebSocket) {
//     if (!ws.isAlive) {
//       const msg = JSON.stringify({
//         type: WsMessageCodes.CHAT_MESSAGE,
//         data: {
//           type: "chat",
//           message: `"${ws.nickname}" lost connection.`,
//           timestamp: Date.now(),
//         },
//       });
//       sendToAll(ws, msg);
//       console.log(`'${ws.nickname}' lost connection, disconnecting ...`);
//       return ws.terminate();
//     }

//     const timeDifference = Date.now() - ws.lastMessageTime;

//     if (timeDifference >= config.LAST_MSG_MAX_TIMEOUT) {
//       usersStore.deleteUser(ws.nickname);
//       const msg = JSON.stringify({
//         code: WsMessageCodes.CHAT_MESSAGE,
//         data: {
//           type: "chat",
//           message: `"${ws.nickname}" disconnected due being silent too long!`,
//           timestamp: Date.now(),
//         },
//       });
//       console.log(`'${ws.nickname}' closing connection due, deleted from users store to free nickname, sent info message to all`);
//       sendToAll(ws, msg);
//       ws.registered = false;
//       ws.close(WsCloseCodes.USER_SILENT_TOO_LONG, "");
//     }

//     ws.isAlive = false;
//     ws.ping(noop);
//   });
// }, config.LAST_MSG_CHECK_INTERVAL);

// // Gracefull timeout
// const sigs = ["SIGINT", "SIGTERM", "SIGQUIT"];
// sigs.forEach(sig => {
//   (process as NodeJS.EventEmitter).on(sig, () => {
//     clearInterval(interval);
//     wss.close();
//   });
// });
