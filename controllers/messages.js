const Message = require('../models/message');

exports.getMessages = async (req, res) => {
   try {
      const { to } = req.params;
      const { uid } = req;

      const last30 = await Message.find({
         $or: [
            { from: uid, to },
            { from: to, to: uid },
         ],
      })
         .sort({ createdAt: 'desc' })
         .limit(30);

      res.json({
         ok: true,
         messages: last30,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Internal Server Error',
      });
   }
};
