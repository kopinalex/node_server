let mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('debug', true);
const UserSchema = new Schema({
  username: { type: String },
  mail: {type: String },
  message: [{ type: Schema.Types.ObjectId, ref: 'message'}],
  addedAt: { type: Date, default: Date.now}
}, {versionKey: false});

//UserSchema.pre ('save', function (next) {
//
//
//});
const user = mongoose.model('user', UserSchema, 'user');
module.exports = user;
/*
later we needs to add a line for "photo"
*/
