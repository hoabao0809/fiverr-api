const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subTypeJobSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: false,
    default: true,
  },
  typeJob: {
    type: Schema.Types.ObjectId,
    ref: 'TypeJob',
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: false,
    },
  ],
});

module.exports = mongoose.model('SubTypeJob', subTypeJobSchema);
