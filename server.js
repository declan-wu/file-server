const net = require("net");
const fs = require("fs");

const server = net.createServer();

server.on("connection", client => {
  client.setEncoding("utf8"); // interpret data as text
  console.log("New client connected!");
  let contents = fs.readFileSync("./sample_img.png", "base64");
  // fs.writeFile(`contentsServer`, contents, err => {
  //   console.log(err);
  // });
  client.write(contents);
  client.destroy();
  // client.pipe(client);
  // fs.readFile("sample_img.png", (err, data) => {
  //   if (!err) {
  //     client.write(data);
  //   } else {
  //     console.log("readfile err");
  //   }
  // });
  // client.pipe(client);
});

server.listen(3000, () => {
  console.log("Server listening on port 3000!");
});

server.on("error", err => {
  throw err;
});

// let contents = fs.readFileSync("./sample_img.png", "base64");
// console.log(contents);
// fs.writeFile(`./me.png`, contents, "base64", function(err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("The file was saved!");
// });
