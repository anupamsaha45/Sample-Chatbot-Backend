/**
*
*** @author     : Anupam Saha, Ashish Kumar
*
*** @date       : 19-12-2019
*
*** @Description: Handles all the related context.
* 
**/

const UserCtrl = require('../database/controllers/user')
const Response = require("../lib/response")



/* processes the incoming user message based on the context and dialogFlow
 response, sets the new context and returns the next question to ask to the user.*/

const handle = async (context, userId, text) => {
    return new Promise(async (resolve, reject) => {
        try {
            var messages;
            var _user;
            var nextContext;
            _user = await UserCtrl.getUserDataById(userId)   //true is set if we want to populate with company

            if(context == 'welcomeAndAskName') {
                let userData = await UserCtrl.updateUserDataById(userId, {'name': text})       
                await setAndDeleteContext(userId, 'email')
                messages = await Response['email']()   

            } 
        
            resolve(messages)       //Sends the next question to calling function.
        
        } catch(err) {
            reject(err)
        }
    })
}






/*Setting and reseting contexts*/

async function setAndDeleteContext(userId, context) {
    await deleteContext(userId)
    await setContext(userId, context)
}

var updateUserData = async (userId, data) => {
   let __user = await UserCtrl.updateUserDataById(userId, data)   
    return __user
}

const setContext = (userId, context) => {
    return new Promise(async (resolve, reject) => {       
        __user = await updateUserData(userId, { context: context })
        resolve(context)
    })
}

const getContext = (userId) => {
    return new Promise(async (resolve, reject) => {
        __user = await UserCtrl.getUserDataById(userId)
        resolve(__user.context)
    })
}

const deleteContext = (userId) => {
    return new Promise(async (resolve, reject) => {

        __user = await updateUserData(userId, { context: '' })
        resolve()
    })
}

module.exports = {
    handle,
    setContext,
    getContext,
    deleteContext,
    setAndDeleteContext,
    updateUserData,
}