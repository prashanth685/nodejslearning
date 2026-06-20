const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 7000 });
server.on("connection", (socket) => {
  console.log("user is connected");
  socket.on("message", (message) => {
    const text = message.toString();
    console.log("Recived", text);

    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });
});
