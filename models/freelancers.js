const mongoose = require('mongoose');

const freeShema = mongoose.Schema({
    nom: { type: String, required: true },
    bio: { type: String, required: true },
    profile: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    createdate:{type:Date, default: Date.now()}
})

module.exports = mongoose.model('Free', freeShema);