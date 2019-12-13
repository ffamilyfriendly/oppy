const mongoose = require("mongoose");

const presetSchema = mongoose.Schema({
    username: String,
    userID: String,
    name: String,
    description: String,
    tag1: String,
    tag2: String,
    tag3: String,
    preset: Object
});

module.exports = mongoose.model("preset", presetSchema);
