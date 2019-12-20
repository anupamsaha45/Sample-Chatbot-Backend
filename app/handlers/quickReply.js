
const Context = require('./context');
const UserCtrl = require('../database/controllers/user')
const Response = require("../lib/response")


exports.handleQuickReplies = async (payload, updatedUser, _context, userId) => {
    try {
        var messages = []
        updatedUser = await UserCtrl.getUserDataById(userId, true)   //true is set if we want to populate with company

        if (payload.includes('restart')) { 
            if(payload.split('_')[1] == 'true') {
                
                await Context.setContext(userId, 'welcome')
                messages = await Response['welcome']()
            
            } else {
                messages = await Response[_context](updatedUser)
            }

        } 

        return messages
    
    } catch(err) {
        console.log("Error occurred", err)
    }
}