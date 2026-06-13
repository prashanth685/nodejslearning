const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://13.206.135.148:1883", {
  username: "Sarayu",
  password: "IOTteam@123",
});

const topic = "lucky/g1/topic1|m/s";

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  setInterval(() => {
    // Random integer between 1 and 100
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    client.publish(topic, randomNumber.toString(), (err) => {
      if (err) {
        console.error("Publish failed:", err);
      } else {
        console.log(`Published: ${randomNumber}`);
      }
    });
  }, 5000);
});

client.on("error", (err) => {
  console.error("MQTT Error:", err);
});
