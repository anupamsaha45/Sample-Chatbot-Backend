// You can find your project ID in your Dialogflow agent settings
// https://dialogflow.com/docs/agents#settings

const Dialogflow = require('dialogflow');
const Config = require("./index");
const ProjectId = Config.dfProjectId; 
const SessionId = Config.dfSessionId;


//DialogFlow configuration setup
const dialogflow_config = {
    credentials: {
        private_key: Config.dfPrivateKey,
        client_email: Config.dfClientEmail
    }
};

const sessionClient = new Dialogflow.SessionsClient(dialogflow_config);
const sessionPath = sessionClient.sessionPath(ProjectId, SessionId);

/**
*
 *** @author     : Anupam Saha, Ashish Kumar
 *
 *** @date       : 19-12-2019 
 *
 *** @description: Passes the text to the dialogflow and returns the response to the calling function
 * 
 **/

module.exports = async (text) => {
    if (text) {
        var message = text;
        var request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'en-US',
                }
            },
        };
        responses = await sessionClient.detectIntent(request);
        return responses; //returns the dialogFlow message to the calling function
    }

}