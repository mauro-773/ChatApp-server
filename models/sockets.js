const {
   userConnected,
   userDisconnected,
   getUsers,
   saveMessage,
} = require('../controllers/sockets');
const { verifyJWT } = require('../helpers/generateJWT');

class Sockets {
   constructor(io) {
      this.io = io;
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

         // Unir el usuario a una sala de socket
         socket.join(uid);

         // TODO: Emitir todos los usuarios conectados
         this.io.emit('users-list', await getUsers());

         // TODO: Socket join, uid

         // TODO: Cuando el cliente manda un mensaje 1-1
         socket.on('personal-message', async (payload) => {
            const message = await saveMessage(payload);
            this.io.to(payload.to).emit('personal-message', message);
            this.io.to(payload.from).emit('personal-message', message);
         });

         // TODO: Disconnect
         socket.on('disconnect', async () => {
            await userDisconnected(uid);
            this.io.emit('users-list', await getUsers());
         });
      });
   }
}

module.exports = Sockets;
