const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    socketId: String,
    disconnected_at: Date,
    paymentToken: String,
    context: String,
    email: String,
    name: String,
    address: String,
    phone: String,

    paymentStatus: Number
    

}, { timestamps: true })
const user = mongoose.model('user', userSchema);

module.exports = user;