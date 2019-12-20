const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    companyId: {type: Schema.Types.ObjectId, ref: 'company'},
    token: String,
    amount: String,
    paymentUrl: String,
    paymentStatus: Number,
    refUrl: String
}, { timestamps: true })
const payment = mongoose.model('payment', paymentSchema);

module.exports = payment;