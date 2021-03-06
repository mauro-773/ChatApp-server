const User = require('../models/user');

exports.userConnected = async (uid) => {
   try {
      const user = await User.findById(uid);
      user.online = true;
      await user.save();

      return user;
   } catch (error) {
      console.log(error);
   }
};

exports.userDisconnected = async (uid) => {
   try {
      const user = await User.findById(uid);
      user.online = false;
      await user.save();

      return user;
   } catch (error) {
      console.log(error);
   }
};
