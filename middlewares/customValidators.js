const User = require('../models/user');

const emailExists = async (value) => {
   const emailExist = await User.findOne({ email: value });

   if (emailExist) {
      return Promise.reject('El usuario ya está registrado');
   }
   return true;
};

module.exports = { emailExists };
