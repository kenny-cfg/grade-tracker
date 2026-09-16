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

app.get('/student/:id', async (req, res) => {
  const id = req.params.id;
  const [students] = await pool.query('SELECT * FROM students WHERE id = ?', id)
  const student = students[0];
  const [grades] = await pool.query('SELECT score FROM grade WHERE student_id = ?', id);
  res.json({
    id: id,
    name: student.name,
    grades: grades.map(it => it.score)
  })
})

app.post('/student', async (req, res) => {
  const name = req.body.name;
  const [rows] = await pool.query(
    'INSERT INTO students (name) VALUES (?)',
    name
  );
  res.json({
    id: rows.insertId,
    name: name
  });
})

app.post('/student/grade', async (req, res) => {
  const id = req.body.id;
  const grades = req.body.grades;
  for (const grade of grades) {
    await pool.query(
      'INSERT INTO grade (student_id, score) VALUES (?, ?)',
      [id, grade]
    )
  }
  res.status(201).send();
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})