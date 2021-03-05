const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const path = require('path');

const Sockets = require('./sockets');
const { connectMongo } = require('../database/config');

class Server {
   constructor() {
      this.app = express();
      this.port = process.env.PORT || 4000;
      this.server = http.createServer(this.app);
      this.io = socketio(this.server);
      this.connectMongoDB = connectMongo;
   }

   middlewares() {
      this.app.use(express.static(path.resolve(__dirname, '..', 'public')));
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use('/api/login', require('../routes/auth'));
      this.app.use('/api/messages', require('../routes/messages'));
   }

   socketConfig() {
      const sockets = new Sockets(this.io);
      sockets.socketEvents();
   }

   init() {
      this.connectMongoDB();
      this.middlewares();
      this.socketConfig();
      this.server.listen(this.port, () => {
         console.log('Server running on port:', this.port);
      });
   }
}

module.exports = Server;
