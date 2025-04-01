
const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/add', (req, res) => {
  res.render('recipes/add');
});

router.post('/add', async (req, res) => {
  const { name, type, description, cookingtime, ingredients, instructions } = req.body;
  const uid = req.session.user?.uid || 1;

  try {
    await db.query(
      'INSERT INTO recipes(name, type, description, cookingtime, ingredients, instructions, uid) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [name, type, description, cookingtime, ingredients, instructions, uid]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send("DB error");
  }
});

module.exports = router;
