const http = require('http');
const port = process.env.APP_PORT || 3000;

const shutdown = (signal) => {
    if (!signal) {
        console.log(`API Server shutting down at ${new Date()}`);
    } else {
        console.log(`Signal ${signal} API Server shutting down at ${new Date()}`);
    }
    server.close(function () {
        process.exit(0);
    })
};

// Creates a server
const server = http.createServer(handleRequest);
// Starts the server
server.listen(port, (err) => {
if (err) {
    throw err;
}
console.log(`Node HTTP listening on ${port}`);
});

/** A function which handles requests and send response. */
function handleRequest(request, response) {
    const message = process.env.SIMPLE_TRAVIS_MESSAGE || `Hello at ${new Date()}`
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.end(JSON.stringify({message}));
}

process.on('SIGTERM', function () {
    shutdown('SIGTERM');
});

process.on('SIGINT', function () {
    shutdown('SIGINT');
});

module.exports = { server, shutdown };



