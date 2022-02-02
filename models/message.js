let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

let messageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  timeStamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  message: { type: String, required: true },
});

// export model
module.exports = mongoose.model('message', messageSchema);
