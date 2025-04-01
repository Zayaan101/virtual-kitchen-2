
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models/db');

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    await db.query(
      'INSERT INTO users(username, password, email) VALUES($1, $2, $3)',
      [username, hashed, email]
    );
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.send("DB error");
  }
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    const user = result.rows[0];
    if (!user) return res.send("Invalid login");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.send("Invalid login");

    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send("DB error");
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
