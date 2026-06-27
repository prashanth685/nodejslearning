const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://192.168.1.231:1883", {
  // username: "Sarayu",
  // password: "IOTteam@123",
});
// const client = mqtt.connect("mqtts://fota.hashstudioz.com:8883", {
//   username: "hashiot",
//   password: "Hash@123",
//   rejectUnauthorized: false,
// });

const topic = "sarayu/d1/topic1";

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
