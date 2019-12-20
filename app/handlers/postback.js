const Response = require("../lib/response")

exports.handlePostbackButton = async (payload, updatedUser, _context) => {
    try {
        var messages = []

        if(payload.toLowerCase() == 'restart') {
            var messages = await Response['restart'](updatedUser)
        
        }
        
        return messages
    
    } catch(err) {
        console.log("Error occurred", err)
    }
}