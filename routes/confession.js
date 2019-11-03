const express = require('express');

const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');
const User = require('../models/User');
const Confession = require('../models/Confession');

router.get('/home', checkIfLoggedIn, async (req, res, next) => {
  try {
    const allConfessions = await Confession.find().populate('user');
    return res.json(allConfessions);
  } catch (error) {
    next(error);
  }
});

router.post('/confess', checkIfLoggedIn, async (req, res, next) => {
  const {
    description, category, isDestroyed,
  } = req.body;
  const user = req.session.currentUser._id;
  // Això m'agradaria endur-m'ho a un helper extern
  const d = new Date();
  const date = d.toJSON().slice(0, 10).replace(/-/g, '-');
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const time = `${hours}:${minutes}`;

  if (description === '' || category === '') {
    res.status(404).json({ code: 'Fill all fields before submitting' });
  } else {
    try {
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

router.get('/myconfessions/:confessionId', checkIfLoggedIn, async (req, res, next) => {
  try {
    const { confessionId } = req.params;
    const confession = await Confession.findOne({ _id: confessionId }).populate('user');
    return res.json(confession);
  } catch (error) {
    next(error);
  }
});

router.delete('/myconfessions/:confessionId', checkIfLoggedIn, async (req, res, next) => {
  try {
    const { confessionId } = req.params;
    const { _id } = req.session.currentUser;
    const confession = await Confession.findByIdAndDelete({ _id: confessionId });
    const userUpdate = await User.findByIdAndUpdate(_id, {
      $pull: { userConfessions: confessionId },
    }, { new: true });
    req.session.currentUser = userUpdate;
    return res.status(200).json({ code: 'Confession deleted', confession });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
