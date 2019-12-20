const UserCtrl = require('../database/controllers/user');
const Context = require('./context');
const Collection = require("../lib/collection")
const Conversation = require('../lib/conversation');
const Response = require("../lib/response")
const PaymentCtrl = require('../database/controllers/payment');
const Mail = require('./mail')


 
exports.paymentUpdate = async (io, socket, status, fields) => {  
    try {
        var updatedUser = await UserCtrl.getUserDataById(fields.userId, true)

        if (status == Collection.paymentStatus['oldLink']) {
            messages = [{
                "text": "Please click the latest link to complete the payment process."
            }]

        } else if (status == Collection.paymentStatus['paid']) {
            resUser = await UserCtrl.updateUserDataById(fields.userId, { context: 'rate', paymentStatus: 1 })
                    
            let queryData = {
                'token': fields.token,
                'userId': fields.userId
            }

            resPayment = await PaymentCtrl.updatePaymentData(queryData, { paymentStatus: 1, amount: fields.amount, refUrl: fields.refUrl })
            messages = await Response.paymentSuccess(resUser, resPayment)

            resMail = await Mail.sendMail(updatedUser)

        } else if (status == Collection.paymentStatus['failed']) {
            res = await UserCtrl.updateUserDataById(userId, { context: 'payment_failure', payment_status: -2 })
            messages = [{
                "text": "Oops. Payment not suceeded. Please try again."
            }]

        } else if (status == Collection.paymentStatus['cancelled']) {
            await Context.setAndDeleteContext(userid, 'payment_cancelled')
            res = await Context.updateUserData(userid, { payment_status: 2 })
            messages = await ProcessMessage.checkLanguage('payment_cancelled',updatedUser)
        }

        for (var i = 0; i < messages.length; i++) {
            var msg = await Conversation.createConversation(fields.userId, 'bot', messages[i]) 
            io.to(updatedUser.socketId).emit('bot-reply', messages[i])
        }
    
    } catch(err) {
        console.log("Error occurred", err)
    }
}



