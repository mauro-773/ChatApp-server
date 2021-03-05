const { Router } = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth');
const { emailExists } = require('../middlewares/customValidators');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');

const router = Router();

/* PATH: api/login */

/* REGISTER */
router.post(
   '/new',
   [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail().custom(emailExists),
      check(
         'password',
         'La contraseña debe tener un mínimo de 6 carácteres'
      ).isLength({ min: 6 }),
      fieldValidator,
   ],
   authController.createUser
);

/* LOGIN */
router.post(
   '/',
   [
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'La contraseña es obligatoria').not().isEmpty(),
      fieldValidator,
   ],
   authController.postLogin
);

/* NEW TOKEN */
router.get('/renew', jwtValidator, authController.getNewToken);

module.exports = router;
