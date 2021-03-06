const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
   return new Promise((resolve, reject) => {
      const payload = { uid };
      jwt.sign(
         payload,
         process.env.SECRET_JWT_SEED,
         {
            expiresIn: '2h',
         },
         (err, token) => {
            if (err) {
               console.log(err);
               reject('No se pudo generar el token');
            }

            resolve(token);
         }
      );
   });
};

const verifyJWT = (token = '') => {
   try {
      const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

      return [true, uid];
   } catch (error) {
      console.log(error);
      return [false];
   }
};

module.exports = { generateJWT, verifyJWT };
