class Sockets {
   constructor(io) {
      this.io = io;
      this.socketEvents();
   }

   socketEvents() {
      this.io.on('connection', (socket) => {
         console.log('Socket connected!');
         // TODO: Validar JWT

         // TODO: Saber que usuario esta activo

         // TODO: Emitir todos los usuarios conectados

         // TODO: Socket join, uid

         // TODO: Cuando el cliente manda un mensaje 1-1

         // TODO: Disconnect
      });
   }
}

module.exports = Sockets;
