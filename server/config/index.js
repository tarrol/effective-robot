const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/effective_robot");

module.exports = mongoose.connection;
