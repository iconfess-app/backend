
const express = require('express');
const bcrypt = require('bcrypt');
const {
  checkUsernameAndPasswordNotEmpty,
  checkIfLoggedIn,
} = require('../middlewares');
const User = require('../models/User');

const bcryptSalt = 10;
const router = express.Router();

router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    res.status(200).json(req.session.currentUser);
  } else {
    res.status(401).json({ code: 'unauthorized' });
  }
});

router.post('/signup', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
  const {
    username, password, email, isOver16,
  } = res.locals.auth;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(422).json({ code: 'username-not-unique' });
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create(
      {
        username, hashedPassword, email, isOver16,
      },
    );
    req.session.currentUser = newUser;
    return res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post('/updatepassword', checkIfLoggedIn, async (req, res, next) => {
  const { password } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.findByIdAndUpdate(_id, {
      hashedPassword,
    });
    req.session.currentUser = user;
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
  const { email, password } = res.locals.auth;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ code: 'user not found' });
    }
    if (bcrypt.compareSync(password, user.hashedPassword)) {
      req.session.currentUser = user;
      return res.json(user);
    }
    return res.status(404).json({ code: 'not-found' });
  } catch (error) {
    next(error);
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    return res.status(204).send();
  });
});

router.put('/edit', checkIfLoggedIn, async (req, res, next) => {
  const {
    username,
    password,
    email,
    age,
    allowsLocation,
    allowsContact,
    lightMode,
    avatar,
  } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const user = await User.findByIdAndUpdate(_id, {
      username,
      password,
      email,
      age,
      allowsLocation,
      allowsContact,
      lightMode,
      avatar,
    }, { returnOriginal: false });
    req.session.currentUser = user;
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/delete', checkIfLoggedIn, async (req, res, next) => {
  try {
    const { _id } = req.session.currentUser;
    const user = await User.findByIdAndRemove(_id);
    return res.status(200).json({ code: 'User deleted', user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
