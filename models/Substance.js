const mongoose = require('mongoose');

const SubstanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  iconFlag: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  heathConcern: {
    type: String,
  },
  additionalData: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Substance = mongoose.model('substance', SubstanceSchema);
