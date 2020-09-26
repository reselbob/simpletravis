'use strict';

const http = require('http');
const port = process.env.APP_PORT || 3000;

/** Starts a HTTP server that receives requests on sample server port. */
function startServer(port) {
  // Creates a server
  const server = http.createServer(handleRequest);
  // Starts the server
  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Node HTTP listening on ${port}`);
  });
}

/** A function which handles requests and send response. */
function handleRequest(request, response) {
    const str = process.env.SIMPLE_TRAVIS_MESSAGE || `Hello at ${new Date()}`
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.end(str);
}

startServer(port);
