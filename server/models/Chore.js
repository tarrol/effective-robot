const { Schema, model } = require("mongoose");
// const { Chore } = require(".");

const choreSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  points: {
    type: String,
    default: "0",
  },
  flavorText: {
    type: String,
    default: "",
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: "List"
  },
  isComplete: {
    type: Boolean,
    default: false
  }
});

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  chores: {
    type: [choreSchema],
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});


module.exports = {
  Chore: model("Chore", choreSchema),
  List: model("List", listSchema),
};
