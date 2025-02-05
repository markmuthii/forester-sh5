import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  console.log(req.url);

  let fileName = "404.html";

  if (req.url === "/") {
    fileName = "index.html";
  } else if (req.url === "/about") {
    fileName = "about.html";
  } else if (req.url === "/contact") {
    fileName = "contact.html";
  } else if (req.url.includes("assets")) {
    fileName = req.url.slice(1);
  }

  // TODO: Handle errors
  let file = fs.readFileSync(`./public/${fileName}`);

  fileName == "404.html" && res.writeHead(404);
  res.end(file);
});

server.listen(3005, () => {
  console.log("The server is running on port 3005");
});
