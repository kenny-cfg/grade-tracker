const express = require('express');
const pool = require('./database');
// TODO: .env file
const port = 3000;
const app = express();

app.get('/student', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM students');
  res.json(rows);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})