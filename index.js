const express = require('express');
// TODO: .env file
const port = 3000;
const app = express();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})