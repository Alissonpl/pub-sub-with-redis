const http = require("http");
const crypto = require("crypto");
const server = http.createServer();
const queue = require("./queue");

setInterval(() => {
  queue.publish("channel1", "alisson");
}, 1000);

server.on("upgrade", async (request, socket, head) => {
  const key = request.headers["sec-websocket-key"];
  const hash = crypto
    .createHash("sha1")
    .update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
    .digest("base64");

  const headers = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${hash}`,
  ];
  socket.write(headers.concat("", "").join("\r\n"));

  await queue.subscribe("channel1", (message) => {
    socket.write(message);
  });

  // handle messages and subscriptions here
});

server.listen(8000);
