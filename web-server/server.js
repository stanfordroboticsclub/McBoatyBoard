// const net = require('net');
//
// // Create a server object
// const server = net.createServer((socket) => {
//     socket.on('data', (data) => {
//         console.log(data.toString());
//     });
//
//     socket.write('SERVER: Hello! This is server speaking.\n');
//     socket.end('SERVER: Closing connection now.\n');
// }).on('error', (err) => {
//     console.error(err);
// });
//
// // Open server on port 9898
// server.listen(8000, () => {
//     console.log('opened server on', server.address().port);
// });
const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
server.listen(8000);

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        console.log('Received Message:', message.utf8Data);
        connection.sendUTF('Hi this is WebSocket server!');
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});