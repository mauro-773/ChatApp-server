const User = require('../models/user');
const Message = require('../models/message');

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

exports.getUsers = async () => {
   try {
      const users = await User.find().sort('-online');

      return users;
   } catch (error) {
      console.log(error);
   }
};

exports.saveMessage = async (payload) => {
   try {
      const message = new Message(payload);
      await message.save();

      return message;
   } catch (error) {
      console.log(error);
   }
};
