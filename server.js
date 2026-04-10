const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Permet au serveur de trouver vos fichiers HTML/CSS
app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('Nouvelle connexion !');

    // Réception d'un message
    socket.on('chat message', (data) => {
        // Renvoi à tout le monde
        io.emit('chat message', data);
    });
});

// Port 3000 (accessible via http://localhost:3000)
server.listen(3000, '0.0.0.0', () => {
    console.log('Serveur actif sur le port 3000');
});
