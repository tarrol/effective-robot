const { Schema, model } = require("mongoose");

const choreSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    points: {
        type: Number,
        default: 0,
    }
});

const Chore = model('Chore', choreSchema);