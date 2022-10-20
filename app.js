const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = require('./utils/database');
const User = require('./models/user');

const app = express();

dbConnect()
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const newUser = new User({
          name: 'Nguyễn Phong Dinh',
          email: 'dinh@gmail.com',
          password: '1111',
          phone: '0934657867',
          birthday: '1998-05-11',
          gender: true,
          role: 'ADMIN',
          skill: ['LoL', 'WEB', 'DESIGN'],
          certification: ['DIB', 'PYNOW'],
        });
        newUser.save();
      }
      app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
        console.log('Connected');
      });
    });
  })
  .catch((err) => console.log(err));
