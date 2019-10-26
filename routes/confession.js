const express = require('express');
const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');
const User = require('../models/User');
const Confession = require('../models/Confession');

router.get('/home', async (req, res, next) => {
  try {
    const allConfessions = await Confession.find().populate('user');
    return res.json(allConfessions);
  } catch (error) {
    next(error);
  }

});

router.post('/confess', checkIfLoggedIn, async (req, res, next) => {
  const {
    description, category, isDestroyed
  } = req.body;
  const user = req.session.currentUser._id;

  if (description === '' || category === '') {
    res.status(404).json({ code: 'Fill all fields before submitting' });
  } else {
    try {
      // Això m'ho emportaré a un helper extern
      var d = new Date();
      var date = d.toJSON().slice(0, 10).replace(/-/g, '-');
      var hours = d.getHours();
      var minutes = d.getMinutes();
      var time = `${hours}:${minutes}`;
      const newConfession = await Confession.create(
        {
          description, date, time, category, isDestroyed, user,
        });
      const userUpdate = await User.findByIdAndUpdate(user, {
        $push: { userConfessions: newConfession._id },
      }, { new: true }).populate('userConfessions');
      req.session.currentUser = userUpdate;
      return res.json(newConfession);
    } catch (error) {
      next(error);
    }
  }
});

router.get('/myconfessions', checkIfLoggedIn, async (req, res, next) => {
  try {
    const { _id } = req.session.currentUser;
    const user = await User.findOne({ _id }).populate('userConfessions');
    const confessions = user.userConfessions;
    return res.json(confessions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

