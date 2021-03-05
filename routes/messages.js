const { Router } = require('express');

const messagesController = require('../controllers/messages');
const { jwtValidator } = require('../middlewares/jwtValidator');

const router = Router();

router.get('/:to', jwtValidator, messagesController.getMessages);

module.exports = router;
