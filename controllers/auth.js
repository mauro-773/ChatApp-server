const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');

exports.createUser = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      const salt = bcryptjs.genSaltSync();
      const hashedPassword = bcryptjs.hashSync(password, salt);

      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      const jwt = await generateJWT(user.id);

      res.status(201).json({
         ok: true,
         msg: 'Usuario creado correctamente',
         user,
         token: jwt,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Internal Server Error',
      });
   }
};

exports.postLogin = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado',
         });
      }

      const isPasswordValid = bcryptjs.compareSync(password, user.password);
      if (!isPasswordValid) {
         return res.status(401).json({
            ok: false,
            msg: 'La contraseña es incorrecta',
         });
      }

      const jwt = await generateJWT(user.id);

      res.status(200).json({
         ok: true,
         msg: 'Inicio de sesión exitoso',
         user,
         token: jwt,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Internal Server Error',
      });
   }
};

exports.getNewToken = async (req, res) => {
   try {
      const { uid } = req;

      const jwt = await generateJWT(uid);
      const user = await User.findById(uid);

      res.json({
         ok: true,
         token: jwt,
         user,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Internal Server Error',
      });
   }
};
