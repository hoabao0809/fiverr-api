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
  },
  typeJob: {
    type: Schema.Types.ObjectId,
    ref: 'TypeJob',
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('SubTypeJob', subTypeJobSchema);
