const Jwt = require('../lib/token');
const UserCtrl = require('../database/controllers/user')
const ConversationCtrl = require('../database/controllers/conversation')
const Conversation = require('../lib/conversation')
const Context = require('./context');
const Moment = require('moment');
const TextMessageHandler = require('./textMessage')
const QuickReplyHandler = require('./quickReply')
const ButtonHandler = require('./postback')
const Response = require('../lib/response')
const Payment = require('./payment')


/**
 *
 *** @author     : Ashish Kumar, Anupam Saha
 *
 *** @date       : 19-12-2019
 *
 *** @description: Receives token and finds  user corrosponding to that token. If gets no token then creates a new one.
 *
 **/
exports.handle = async (io, socket, token, connected) => {
    var _user;
    try {
        // no token found on client side
        if (!token) {
            console.log('No token exists!')
            let userData = await createNewUser(socket);
            _user = await UserCtrl.getUserDataById(userData.userId)
            if (_user) {
                console.log('New socket connection established!')
                socket.emit('success', userData);
            }
        }
        // if token already exists on client side
        else {
            var payload = await Jwt.verifyToken(token, true);
            userId = payload.token
            console.log("UserId received from token", userId)
            _user = await UserCtrl.getUserDataById(userId)
            
            //Checking the refresh window time
            if (_user != null && connected) {
                if (false) {
                    
                    res = await ConversationCtrl.deleteUserConversation(_user._id)
                    console.log('Conversation deleted....')
                    await Context.setContext(_user._id, 'getStarted')
                    
                    //res = await UserCtrl.deleteUserData(_user._id)
                    console.log('User Data deleted.....')
                }

                console.log('Token and user both exist')
                _user = await Context.updateUserData(_user._id, { socketId: socket.id })
                const tokenVerification = await Jwt.verifyToken(token);
                var _context = await Context.getContext(_user._id)
            }

            //Token and user both exist
           else if(connected) { //Token exist but user does not exist. So, Creating new user
                console.log('Token exist but user does not exist. So, Creating new user')

                let userData = await createNewUser(socket);
                _user = await UserCtrl.getUserDataById(userData.userId)
                if (_user) {
                    console.log('New socket connection established!')
                    socket.emit('success', userData);
                }
            
            } else {
                _user = await Context.updateUserData(_user._id, { socketId: socket.id })
            }


            if (_context) {
                console.log('Socket connection re-established!')
                socket.emit('success', {
                    message: 'User exists!'
                });
            }
        }

    } catch (error) {
        console.log('Token Expired or some error occured', error)
  
        let userData = await createNewUser(socket);
        _user = await UserCtrl.getUserDataById(userData.userId)
        if (_user) {
            console.log('New socket connection established!')
            socket.emit('success', userData);
        }
      
    }

    /**
    *
    *** @author     : Ashish Kumar, Anupam Saha
    *
    *** @description: Triggered when user sends the message and chat-message is emitted from fronEnd. Saves user convo to Db.
    It finds the context then Checks the plugin and go to particular handler i.e 
    textMessage or quick reply or postback. Returned message is passed to sendMessageToUser
    *
    **/
    socket.on('chat-message', async (data) => {
        try {
            console.log('user message:::', data.message)
            await Conversation.createConversation(_user._id, 'user', data.message) //Saves user convo to Db

            var messageText = data.message.text
            var quick_reply = data.message.quick_replies
            var attachment = data.message.attachment

            if (attachment)
                if (attachment.type == 'template' && attachment.payload.template_type == 'button')
                    var postback = data.message.attachment.payload.buttons

            var messages = [];

            var _context = await Context.getContext(_user._id); // Fetches the context for that user
            var updatedUser = await UserCtrl.getUserDataById(_user._id) //Fetches the updated data from User Db

            if (messageText) //Goes to textMessage page
                messages = await TextMessageHandler.handleTextMessage(messageText, updatedUser, _context, _user._id)

            else if (quick_reply) //Goes to quickReply page
                messages = await QuickReplyHandler.handleQuickReplies(quick_reply[0].payload, updatedUser, _context, _user._id)

            else if (postback) //Goes to postback page
                messages = await ButtonHandler.handlePostbackButton(postback[0].payload, updatedUser,  _context, _user._id)
            

        } catch (error) {
            console.log('Uncaught Error in chat-message...[157]', error)
            //await Mail.sendMailandLogError(error)
            var messages = await Response['error']()
        }

        console.log('Response To User::', JSON.stringify(messages));
        console.log('--------------------------End--------------------------')

        //Sends next conversation to user
        await sendMessageToUser(messages, socket, _user._id, 'bot-reply') //Returned Message is passed for emit


    })

    socket.on('auth-success', async (data) => {
        try {
            console.log('auth-success')
            var datetime = new Date();  
            console.log("DateTime", datetime)
            convo = await Conversation.loadConversation(_user._id)
            if (convo.length > 0) {
                console.log("Chat History exsists... Loading history", convo)
                socket.emit('loadChat', convo);

            } else {
                console.log("No Chat History exists...Fetching first convo")
                Context.setAndDeleteContext(_user._id, "welcomeAndAskName")
                var messages = await Response['welcomeAndAskName']()
                await sendMessageToUser(messages, socket, _user._id, 'bot-reply')
            }

        } catch(error) {
            console.log('Uncaught Error in auth-success...[185]', error)
            await Mail.sendMailandLogError(error)
            var messages = await Response.nextMessage('error', _user._id)
            await sendMessageToUser(messages, socket, _user._id, 'bot-reply')
        }
    });


    socket.on('disconnect', async () => {
        try {
            console.log('User disconnected', socket.id)
            __user = await UserCtrl.getUserData({'socketId': socket.id})

            var datetime = new Date();
            res = await Context.updateUserData(__user._id, { disconnected_at: datetime })

            console.log('--------------------------Disconnected--------------------------')
        
        } catch(error) {
            console.log('Uncaught error in disconnect', error)
            await Mail.sendMailandLogError(error)
        }
    });

    //Executes when mollie redirects payment update response to the redirect url.
    exports.payment = async (status, fields) => {
        Payment.paymentUpdate(io, socket, status, fields)
    }

    // Sends and stores messages to the user one by one from array of messages
    async function sendMessageToUser(messages, socket, userid, event) {
        try {
            for (var i = 0; i < messages.length; i++) {
                var msg = await Conversation.createConversation(userid, 'bot', messages[i]) //Stores convo to the database
                socket.emit(event, messages[i])
            }
        
        } catch(error) {
            console.log('Error in sendMessageToUser...', error)
            await Mail.sendMailandLogError(error)
        }
}



} //End of handle function

//recursive function to create jwt token for new socket connection
async function createNewUser(socket) {
    try {
        let data = {
            socketId: socket.id,
        };
        let _user = await UserCtrl.createUserData(data)
        let payload = {
            token: _user._id
        }
        let token = await Jwt.createToken(payload);

        return { token: token, userId: _user._id };
    
    } catch(error) {
        console.log('Error in creating new user...', error)
        var messages = await Response.nextMessage('error', _user._id)
        await sendMessageToUser(messages, socket, _user._id, 'bot-reply')
        await Mail.sendMailandLogError(error)
    }
}

//Calculates the chat expiry time and returns true if chat have to be deleted else returns false
function  isChatExpires(disconnect_time) {
    try {
        var diss_time = Moment(disconnect_time);
        var diss_time_format = diss_time.utc().format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
        var diss_timestamp = new Date(diss_time_format).getTime();

        var exp_time = diss_time.add(24, 'h');
        var exp_time_format = exp_time.format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
        var exp_timestamp = new Date(exp_time_format).getTime();

        var currtime = new Date();
        var curr_time = Moment(currtime);
        var curr_time_format = curr_time.utc().format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
        var curr_timestamp = new Date(curr_time_format).getTime();

        if (curr_timestamp > exp_timestamp)
            return true
        else
            return false
    
    } catch(error) {
        console.log('Error in isChatExpires...', error)
        Mail.sendMailandLogError(error)
        return false
    }
}