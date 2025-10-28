const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username pantry');
    res.render('users/index', { users });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.redirect('/users');
    res.render('users/show', { user });
  } catch (error) {
    console.error(error);
    res.redirect('/users');
  }
});

module.exports = router;