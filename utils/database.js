const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const mongooseConnect = () => {
  return mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
};

module.exports = mongooseConnect;
