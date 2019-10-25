const express = require('express');
const router = express.Router();
const { checkIfLoggedIn } = require('../middlewares');
const User = require('../models/User');
const Confession = require('../models/Confession');

router.get('/home', (req, res, next) => {
  Confession.find()
    .then((confessions) => {
      console.log(confessions);
      return res.json(confessions);
    })
    .catch((err) => {
      console.log('Error while displaying latest confessions', err);
      next(err);
    });
});

router.post('/confess', checkIfLoggedIn, async (req, res, next) => {
  const {
    description, date, category, isDestroyed
  } = req.body;
  const user = req.session.currentUser._id;

  if (description === '' || date === '' || category === '') {
    res.status(404).json({ code: 'Fill all fields before submitting' });
  } else {
    try {
      const newConfession = await Confession.create(
        {
          description, date, category, isDestroyed, user,
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

