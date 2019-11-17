const express = require('express');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');
const Chat = require('../models/Chat');

router.get('/getchats', checkIfLoggedIn, async (req, res, next) => {
  try {
    const chats = await Chat.find().populate('sender');
    const recentChats = [];
    const now = new Date();
    chats.forEach((chat) => {
      const minAgo = (now - new Date(`${chat.createdAt}`)) / 60000;
      if (minAgo < 15) {
        recentChats.push(chat);
      }
    });
    return res.json(recentChats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
