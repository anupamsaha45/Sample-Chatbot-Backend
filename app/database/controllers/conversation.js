const Conversation = require('../models/conversation')

//Controller to save conversation
exports.createConversation = (message) => {
   return new Promise((resolve, reject) => {
       var _conversation = new Conversation(message);
       if(_conversation.from == 'user') {
          _conversation.message.config = undefined;
       }
       else {
          _conversation.quick_reply = undefined;
          _conversation.text = undefined;

       }
       _conversation.save(function(err, convo) {
           if (err) {            
               reject(err);
           }
           resolve(convo);
       });
   })
}

// Controller to load the chat history from conversation collection
exports.getConversation = (userid) => {
    return new Promise((resolve, reject) => {
      var query = Conversation.find({user_id:userid}).sort({created_at: -1}).limit(20);
      query.exec(function(err, response) {
          if (err) 
            reject(err);
          else
            resolve(response.reverse());
      });
   })
}


// Controller to delete the chat history from conversation collection
exports.deleteUserConversation = (userid) => {
    return new Promise((resolve, reject) => {
        Conversation.remove({ user_id: userid }, function(err, response) {
            if (err)
                reject(err);
            else
                resolve(response);
        });
    });
}