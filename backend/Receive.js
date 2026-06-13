const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://13.206.135.148:1883", {
  username: "Sarayu",
  password: "IOTteam@123",
});

const topic = "D5A1D2/Test";

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe(topic, (err) => {
    if (err) {
      console.error("Subscribe failed:", err);
    } else {
      console.log(`Subscribed to: ${topic}`);
    }
  });
});

client.on("message", (topic, message) => {
  console.log("Topic:", topic);
  console.log("Received:", message.toString());
});

client.on("error", (err) => {
  console.error("MQTT Error:", err);
});

client.on("close", () => {
  console.log("Connection closed");
});
