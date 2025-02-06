import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  let fileName = "404.html";
  let file;

  if (req.url === "/") {
    fileName = "index.html";
  } else if (req.url === "/about") {
    fileName = "about.html";
  } else if (req.url === "/contact") {
    fileName = "contact.html";
  } else if (req.url.includes("assets")) {
    fileName = req.url.slice(1); // /assets/images/forester.png
  }

  file = fs.readFileSync(`./public/${fileName}`);
  // TODO: Handle errors

  if (!req.url.includes("assets")) {
    // The file contains the html content
    let navbar = fs.readFileSync(`./public/components/navbar.html`).toString();
    let footer = fs.readFileSync(`./public/components/footer.html`).toString();

    file = file
      .toString()
      .replace("{navbar}", navbar)
      .replace("{footer}", footer);
  }

  req.url.includes("svg") && res.setHeader("Content-Type", "image/svg+xml");

  fileName == "404.html" && res.writeHead(404);
  res.end(file);
});

server.listen(3005, () => {
  console.log("The server is running on port 3005");
});
