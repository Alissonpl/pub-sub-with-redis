const net = require("net");
const crypto = require("crypto");
const client = net.createConnection({ port: 8000 }, () => {
  // create handshake
  const key = crypto.randomBytes(16).toString("base64");
  const headers = [
    "GET / HTTP/1.1",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Key: ${key}`,
    "Sec-WebSocket-Version: 13",
  ];
  client.write(headers.join("\r\n") + "\r\n\r\n");
  client.on("data", (data) => {
    // handle server response and messages here
    console.log(data);
  });
});
