
const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query("SELECT name, type, description, rid FROM recipes");
    const recipes = result.rows;
    res.render('recipes/list', { recipes });
  } catch (err) {
    console.error(err);
    res.send("DB error");
  }
});

module.exports = router;
