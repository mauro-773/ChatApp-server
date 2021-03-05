const mongoose = require('mongoose');

const connectMongo = async () => {
   try {
      await mongoose.connect(process.env.DB_MONGO, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
      });

      console.log('MongoDB Online');
   } catch (error) {
      console.log(error);
      throw new Error('Error en la inicialización de la base de datos');
   }
};

module.exports = { connectMongo };
