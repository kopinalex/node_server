let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  fileType: {
    type: String
  },
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  timeOfCreation: {
    type: Date,
    required: true,
    default: Date.now()
  },
  versionKey: false
});


const file = mongoose.model('file', FileSchema, 'file');
module.exports = file;
