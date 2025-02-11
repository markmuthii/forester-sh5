import http from "http"; // Import the http module to create a server
import fs from "fs"; // Import the fs module to read files from the file system

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Check if the request method is GET
  if (req.method === "GET") {
    let fileName = "404.html"; // Default file to 404.html
    let file;

    // Determine which file to serve based on the URL
    if (req.url === "/") {
      fileName = "index.html"; // Serve index.html for the root URL
    } else if (req.url === "/about") {
      fileName = "about.html"; // Serve about.html for the /about URL
    } else if (req.url === "/contact") {
      fileName = "contact.html"; // Serve contact.html for the /contact URL
    } else if (req.url.includes("assets")) {
      fileName = req.url.slice(1); // Serve files from the assets folder
    } else if (req.url === "/favicon.ico") {
      res.setHeader("Content-Type", "image/x-icon"); // Set the content type for favicon
      fileName = "favicon.ico"; // Serve the favicon.ico file
    }

    // Read the file from the public directory
    file = fs.readFileSync(`./public/${fileName}`);
    // TODO: Handle errors

    // If the request is not for an asset, include the navbar and footer
    if (!req.url.includes("assets")) {
      // Read the navbar and footer components
      let navbar = fs
        .readFileSync(`./public/components/navbar.html`)
        .toString();
      let footer = fs
        .readFileSync(`./public/components/footer.html`)
        .toString();

      // Replace placeholders in the file with the navbar and footer content
      file = file
        .toString()
        .replace("{navbar}", navbar)
        .replace("{footer}", footer);
    }

    // Set the content type for SVG files
    req.url.includes("svg") && res.setHeader("Content-Type", "image/svg+xml");

    // Set the status code to 404 if the file is 404.html
    fileName == "404.html" && res.writeHead(404);
    res.end(file); // Send the file content as the response
  } else if (req.method === "POST") {
    // Handle POST requests
    if (req.url === "/send-message") {
      // Handle the /send-message URL

      let body = [];
      // Collect the data from the request
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = JSON.parse(Buffer.concat(body).toString());
          // At this point, `body` has the entire request body stored in it as an object

          // Send an email containing that data to the site owner's email
          let responseObject;

          // TODO: set up the condition to be based on whether the email has been sent or not
          const emailSent = true; // Simulate email sent status

          // Respond to the client based on whether the email was sent successfully
          if (emailSent) {
            responseObject = {
              success: true,
              message: "Message Sent Successfully",
            };
          } else {
            responseObject = {
              success: false,
              message: "Message Not Sent Successfully",
            };
          }

          // Set the content type to JSON and send the response
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(responseObject));
        });
    } else {
      // Respond with 404 for other POST URLs
      res.writeHead(404);
      res.end("Not found");
    }
  } else {
    // Respond with a message for unsupported request methods
    res.writeHead(501);
    res.end("REQUEST NOT IMPLEMENTED");
  }
});

// Start the server and listen on port 3005
server.listen(3005, () => {
  console.log("The server is running on port 3005");
});
