const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const userShema = mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPin: { type: String },
    resetPinExpires: { type: Date },
    createdate:{type:Date, default: Date.now()}
});
userShema.plugin(uniquevalidator);
module.exports = mongoose.model('User',userShema);