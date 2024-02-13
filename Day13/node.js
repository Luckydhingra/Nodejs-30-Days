/*
13. Problem: Express WebSocket Integration
Problem Statement: Extend an existing Express application to include WebSocket support. 
Create a WebSocket server that echoes back any message it receives from a client. 
Implement an endpoint "/websocket" that serves an HTML page with JavaScript to establish a WebSocket connection.
*/
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
    ws.send(message);
  });

  ws.on('close', function() {
    console.log('Client disconnected');
  });
});

app.get('/websocket', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});