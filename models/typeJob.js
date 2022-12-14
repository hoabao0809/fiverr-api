const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeJobSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: false,
  },
  subTypeJobs: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'SubTypeJob',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  subtitle: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('TypeJob', typeJobSchema);
