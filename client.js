const net = require("net");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({
  host: "localhost", // change to IP address
  port: 3000
});

const saveToFile = function(contents) {
  //rl.question("Enter a file name to save the file? ", saveAs => {
  let saveAs = "me";
  fs.writeFile(`./${saveAs}.png`, contents, "base64", function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    // rl.close();
  });
  // });
};

conn.setEncoding("utf8"); // interpret data as text

const chunks = [];

conn.on("connect", () => {
  conn.on("data", chunk => {
    chunks.push(chunk);
  });
});

conn.on("end", () => {
  saveToFile(chunks.join(""));
  conn.destroy();
});
