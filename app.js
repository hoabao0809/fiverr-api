const express = require('express');
const dbConnect = require('./utils/database');

const app = express();

dbConnect()
  .then((result) => {
    app.listen(3000, () => {
      console.log('Connected');
    });
  })
  .catch(err => console.log(err));
