
const Dialogflow = require("../../config/dialogflow");
const Context = require('./context')
const Validate = require('../lib/validation')
const Response = require("../lib/response")
const Collection = require("../lib/collection")


exports.handleTextMessage = async (textMessage, updatedUser, _context, userId) => {
    try {
        var messages = []
        var response = await Dialogflow(textMessage); //Sends user data to DialogFlow and waits for response
        var dialogFlowIntent = responses[0].queryResult.intent.displayName

        if (dialogFlowIntent == Collection.intent['default_welcome']) { //Handles the Restart or welcome Message
            messages = await Response['restart']()

        } else if(dialogFlowIntent == Collection.intent['restart']) {
            messages = await Response['restart']()
        
        } else {        
            parameters = []
            console.log("DF parameters", response[0].queryResult.parameters)
            if(response[0].queryResult.parameters)
                parameters = Object.keys(response[0].queryResult.parameters.fields); //fetches the parameters from dialogflow

            if (parameters.includes(_context)) //matches the DialofFlow parameter with context
            {       
                let checkContext = _context
                let filteredText
                        
                dfText = response[0].queryResult.parameters.fields[_context].stringValue; //fetches the dialogFlow value from the user text
                if (dfText) {
                    console.log('dfText is', dfText);
                    filteredText = dfText
                
                } else
                    filteredText = dfText

                if(!Validate[checkContext](filteredText)) 
                    messages = await Response['errorMessage'](updatedUser, checkContext)                    
                else
                messages = await Context.handle(_context, userId, filteredText)   
            
            } else if (Collection.acceptFallback.includes(_context)) {   
                console.log("Inside acceptFallback", _context) 
                let checkContext = _context
            
                if(!Validate[checkContext](textMessage)) 
                    messages = await Response['errorMessage'](updatedUser, checkContext)                    
                else
                    messages = await Context.handle(_context, userId, textMessage)                 
            
            } else if(dialogFlowIntent == Collection.intent['default_fallback']) {
                console.log("Inside fallback")
                messages = await Response['errorMessage'](updatedUser, _context)                    
            
            }
        
        }
        
        return messages
    
    } catch(err) {
        console.log("Error occurred", err)
    }
}