const express = require('express');
const pool = require('./database');
// TODO: .env file
const port = 3000;
const app = express();
app.use(express.json())

app.get('/student', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM students');
  res.json(rows);
})

app.post('/student', async (req, res) => {
  const payload = req.body;
  await pool.query('INSERT INTO students (name) VALUES (?)', payload.name)
  res.send('OK')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})