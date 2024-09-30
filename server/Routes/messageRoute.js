const express = require('express');
const { createMessage,findMessage } = require('../Controllers/messageController');

const router = express.Router();

router.post('/',createMessage);
router.get('/:chatId',findMessage);


module.exports = router;