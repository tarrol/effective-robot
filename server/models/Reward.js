const { Schema, model } = require("mongoose");

const rewardSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Reward", rewardSchema);
