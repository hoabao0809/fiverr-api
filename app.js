const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const ejs = require('ejs');

const dbConnect = require('./utils/database');

const User = require('./models/user');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

const app = express();

// app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  next();
});

// Routes
app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', authRoutes);

// Error handler
app.use((error, req, res, next) => {
  const { statusCode, message, data } = error;
  res.status(statusCode).json({
    message,
    data,
  });
});

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
