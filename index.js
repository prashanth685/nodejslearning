// const fs = require("fs");

// fs.readFile("noteq.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// const content = "hello world";
// const fs = require("fs");
// fs.writeFile("output.txt", content, (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("file written succcesfully");
// });

// const http = require("http");
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-type", "text/plain");
//   res.end("Hello world!");
// });

// server.listen(5000, () => {
//   console.log("server running http://localhost:5000");
// });

// const path = require("path");
// const directory = "/user/local";
// const filename = "example.txt";
// const fullpath = path.join(directory, filename);
// console.log(fullpath);

// const os = require("os");
// console.log(os.platform());

// const url = require("url");
// const myurl = new URL("http://example.com:8000/path/name?query=hello#hash");
// console.log(myurl.host);
// console.log(myurl.pathname);
// const crypto = require("crypto");
// const hash = crypto.createHash("sha256");
// hash.update("Hello world");
// // hash.digest("hex");
// console.log(hash.digest("hex"));

const sayhello = require("./greetings");
const message = sayhello("ajay");
console.log(message);
