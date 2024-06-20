const express = require('express');
const {
  checkDuplicateUsernameOrEmail,
} = require('../middlewares/verifyRegister');
const router = express.Router();

const { register, login } = require('../controllers/auth_controller');

const collection = 'users';

router.post('/register', checkDuplicateUsernameOrEmail, register);
router.post('/login', login);

module.exports = router;
