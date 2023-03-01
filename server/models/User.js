const { Schema, model, ObjectId } = require('mongoose');

const User = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  roles: [{ type: String, ref: 'Role' }],
  files: [{ type: ObjectId, ref: 'file' }],
});

module.exports = model('User', User);
