const express = require('express');
const { registerUser,loginUser,findUser, getUser } = require('../Controllers/userController');

const router = express.Router();

router.post('/registration',registerUser);
router.post('/login',loginUser);
router.get('/find/:userId',findUser);
router.get('/',getUser);


module.exports = router;