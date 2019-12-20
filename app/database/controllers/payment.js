'use strict';

const Payment = require('../models/payment');


function createPaymentData(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const payment = new Payment(data);
            let res = await payment.save();
            resolve(res)

        } catch (err) {
            reject(err)
        }
    });

}

function getPaymentData(query = {}, multi = true) {
    return new Promise(async (resolve, reject) => {
        try {
            var payments
            if(multi)
                payments = await Payment.find(query).sort({ createdAt: -1 }).lean().exec()
            else
                payments = await Payment.findOne(query).lean().exec()
            
                resolve(payments)

        } catch (err) {
            reject(err)
        }

    })
}

function getPaymentDataById(id, populate = false) {
    return new Promise(async (resolve, reject) => {
        try {
            var result;
            if(populate)
                result = await Payment.findById(id).populate('userId');
            else
                result = await Payment.findById(id);

            resolve(result)

        } catch (err) {
            reject(err)
        }

    })
}

function updatePaymentData(query={}, newData) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Payment.findOneAndUpdate(query, { "$set": newData }, { new: true })
            resolve(result)

        } catch (err) {
            reject(err)
        }

    });
}

function updatePaymentDataById(id, newData) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Payment.findByIdAndUpdate(id, { "$set": newData }, { new: true })
            resolve(result)

        } catch (err) {
            reject(err)
        }

    });
}

function deletePaymentData(query={}) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Payment.remove(query)
            resolve(result)

        } catch (err) {
            reject(err)
        }
    })
}

function deletePaymentDataById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Payment.findByIdAndRemove(id)
            resolve(result)

        } catch (err) {
            reject(err)
        }
    })
}


module.exports = {
    createPaymentData,
    getPaymentData,
    getPaymentDataById,
    updatePaymentData,
    updatePaymentDataById,
    deletePaymentData,
    deletePaymentDataById
}