const { userConnected, userDisconnected } = require('../controllers/sockets');
const { verifyJWT } = require('../helpers/generateJWT');

class Sockets {
   constructor(io) {
      this.io = io;
      this.socketEvents();
   }

   socketEvents() {
      this.io.on('connection', async (socket) => {
         const token = socket.handshake.query['x-token'];
         const [isValid, uid] = verifyJWT(token);

         if (!isValid) {
            console.log('Invalid socket!');
            return socket.disconnect();
         }

         await userConnected(uid);

         // TODO: Validar JWT

         // TODO: Saber que usuario esta activo

         // TODO: Emitir todos los usuarios conectados

         // TODO: Socket join, uid

         // TODO: Cuando el cliente manda un mensaje 1-1

         // TODO: Disconnect

         socket.on('disconnect', async () => {
            await userDisconnected(uid);
         });
      });
   }
}

module.exports = Sockets;
