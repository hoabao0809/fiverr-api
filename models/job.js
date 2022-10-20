const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  price: {
    type: String,
    required: true,
  },
  proServices: {
    type: Boolean,
    required: true,
  },
  localSellers: {
    type: Boolean,
    required: true,
  },
  onlineSellers: {
    type: Boolean,
    required: true,
  },
  deliveryTime: {
    type: Boolean,
    required: true,
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'TypeJob',
    required: true,
  },
  subType: {
    type: Schema.Types.ObjectId,
    ref: 'SubTypeJob',
    required: true,
  },
  userCreated: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Job', jobSchema);
