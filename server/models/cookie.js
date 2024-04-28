const mongoose = require('mongoose')

const cookieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    picturePath: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model("Cookie", cookieSchema);
