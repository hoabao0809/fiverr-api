const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../../models/user');

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Email address already exists');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { first_name, last_name, password, ...rest } = req.body;
  const name = capitalize(last_name) + ' ' + capitalize(first_name);

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const newUser = new User({
        ...rest,
        name,
        password: hashedPw,
      });
      return newUser.save();
    })
    .then((result) => {
      res.status(201).json({ message: 'User created', userId: result._id });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postSignin = (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  let loadedUser;

  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error(
          "The email or password that you've entered is incorrect."
        );
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '2h' }
      );

      console.log(token);
      const { password, ...responseUser } = loadedUser._doc;
      res.status(200).json({ user: responseUser, token });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}
