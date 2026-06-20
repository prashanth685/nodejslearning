const express = require("express");
const port = 5000;
const app = express();

// app.get("/", (res, req) => {
//   res.send("hello world!");
// });

app.listen(port, () => {
  console.log(`listing port ${port}`);
});
