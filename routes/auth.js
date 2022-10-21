const express = require('express');
const { body } = require('express-validator');

const authRouter = express.Router();
const authController = require('../controllers/auth/index');
const User = require('../models/user');

// Auth
authRouter.post(
  '/auth/signin',
  [body('email').trim().isEmail(), body('password'.trim())],
  authController.postSignin
);
authRouter.post(
  '/auth/signup',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject('Email address already exists');
          }
        });
      })
      .normalizeEmail(),
    body('password'.trim()),
  ],
  authController.postSignup
);

module.exports = authRouter;
