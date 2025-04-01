const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const createTables = async () => {
  try {
    // Create users table if it doesn't exist
    await pool.query(
      'CREATE TABLE IF NOT EXISTS users (' +
      'uid SERIAL PRIMARY KEY, ' +
      'username VARCHAR(255) NOT NULL, ' +
      'email VARCHAR(255) NOT NULL, ' +
      'password VARCHAR(255) NOT NULL);'
    );

    // Create recipes table if it doesn't exist
    await pool.query(
      'CREATE TABLE IF NOT EXISTS recipes (' +
      'rid SERIAL PRIMARY KEY, ' +
      'name VARCHAR(255) NOT NULL, ' +
      'type VARCHAR(255), ' +
      'description TEXT, ' +
      'cookingtime VARCHAR(50), ' +
      'ingredients TEXT, ' +
      'instructions TEXT, ' +
      'uid INT REFERENCES users(uid));'
    );

    console.log("✅ Tables created successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating tables:", err);
    process.exit(1);
  }
};

createTables();
