let mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating a new schema for the database
const MemberSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  membership_status: ['member', 'nonMember'],
});

module.exports = mongoose.model('Member', MemberSchema);
