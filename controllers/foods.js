const express = require('express');
const router = express.Router({ mergeParams: true }); 
const User = require('../models/user');



router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');
    res.render('foods/index', { pantry: user.pantry, owner: user });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});


router.get('/new', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.redirect('/');
    res.render('foods/new', { owner: user });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push({ name: req.body.name });
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.get('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const item = user.pantry.id(req.params.itemId);
    if (!item) return res.redirect(`/users/${req.params.userId}/foods`);
    res.render('foods/show', { item, owner: user });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const item = user.pantry.id(req.params.itemId);
    if (!item) return res.redirect(`/users/${req.params.userId}/foods`);
    res.render('foods/edit', { item, owner: user });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.itemId);
    if (!item) return res.redirect(`/users/${user._id}/foods`);
    item.set({ name: req.body.name });
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.id(req.params.itemId).remove();
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

module.exports = router;