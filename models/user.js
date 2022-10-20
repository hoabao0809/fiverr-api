const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  skill: [
    {
      type: String,
      required: false,
    },
  ],
  certification: [
    {
      type: String,
      required: false,
    },
  ],
  bookingJob: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: false,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
