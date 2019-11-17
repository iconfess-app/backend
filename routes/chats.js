const express = require('express');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');
const User = require('../models/User');
const Chat = require('../models/Chat');

router.get('/getchats', checkIfLoggedIn, async (req, res, next) => {
  try {
    const chats = await Chat.find().populate('sender');
    return res.json(chats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
