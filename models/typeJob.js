const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeJobSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  subTypeJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubTypeJob',
      required: true,
    },
  ],
  subtitle: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('TypeJob', typeJobSchema);
