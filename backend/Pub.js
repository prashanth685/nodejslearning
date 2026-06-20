const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://192.168.1.231:1883");

const topic = "device";

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    client.publish(topic, randomNumber.toString(), (err) => {
      if (err) {
        console.error("Publish failed:", err);
      } else {
        console.log(`Published: ${randomNumber}`);
      }
    });
  }, 40000);
});

client.on("error", (err) => {
  console.error("MQTT Error:", err);
});
