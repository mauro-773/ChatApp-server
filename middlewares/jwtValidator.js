const jwt = require('jsonwebtoken');

const jwtValidator = (req, res, next) => {
   try {
      const token = req.header('x-token');

      if (!token) {
         return res.status(401).json({
            ok: false,
            msg: 'No existe el token',
         });
      }

      const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
      req.uid = uid;

      next();
   } catch (error) {
      console.log(error);
      return res.status(401).json({
         ok: false,
         msg: 'Token no válido',
      });
   }
};

module.exports = { jwtValidator };
