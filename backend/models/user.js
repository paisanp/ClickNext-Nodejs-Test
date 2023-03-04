const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    username: { type: String, require:true, unique: true },
    phonenumber: { type: String, require:true },
    password: { type: String, require:true },
    current_balance: { type: Number, default: 0 }
});

module.exports = mongoose.model("user", userSchema);