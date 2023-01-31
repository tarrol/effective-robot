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

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    chores: {
        type: [choreSchema]
    }
})

module.exports = {
    // Chore: model('Chore', choreSchema),
    List: model('List', listSchema)
}