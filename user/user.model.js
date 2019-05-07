const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName : {type: String, required: true},
    age: {type: Number, required: true},
    address: {type: String, required: true},
});

UserSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('user', UserSchema);
