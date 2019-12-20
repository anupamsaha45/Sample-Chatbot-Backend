
 /**
 *
 *** @author     : Anupam Saha, Ashish Kumar
 *
 *** @date       : 19-12-2019
 *
 *** @description: All the conversation are getting saved and load last few conversation. It is userd only for 
                   website chatbots.
 * 
 **/
const UserCtrl = require('../database/controllers/user')
const ConversationCtrl = require('../database/controllers/conversation')


//Saves Bot and User Messages
var createConversation = exports.createConversation = async (userId, from, message) => {
    try {
        var bot_message = {
            user_id: userId,
            from: from,
            message: message
        }
        var savedConvo = await ConversationCtrl.createConversation(bot_message) //function call to controller page for saving bot reply
        return savedConvo;
    
    } catch(error) {
        console.log('Error in createConversation function....[27]')
    }

}


/*Loads past conversation using jwtToken coming from frontend. 
If past conversations are present then also loads the flow continuity message and saves in 
conversation collection.*/

exports.loadConversation = async (userId) => {
    try {
    	var data = []
        _user = await UserCtrl.getUserDataById(userId)
        if (_user)
            data = await ConversationCtrl.getConversation(_user._id)

        return data
    
    } catch(error) {
        console.log('Error in loadConversation....[45]')
    }

}
