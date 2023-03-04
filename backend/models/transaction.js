const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    type: {type: String},
    sender: {type: String, require:true},
    receiver: { type: String, require:true},
    amount: { type: Number, require:true },
    remain: { type: Number, require:true },
    date: { type: String },
});

module.exports = mongoose.model("transaction", transactionSchema);