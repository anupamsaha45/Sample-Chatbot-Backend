const Template = require('./template')
const uuidv4 = require('uuid/v4');


/**
 *
 *** @author     : Anupam Saha, Ashish Kumar
 * 
 *** @date       : 19-12-2019 
 *
 *** @description: Contains responses which will be displayed to the user.
 * 
 **/


var welcomeAndAskName = async () => {
    return [
        Template.textMessage("Hello 🙂"),
        Template.textMessage("My name is sample bot. I will create your Termination letter. All you have to do is talk to me (I am still young so I don't handle random questions very well yet...)"),
        Template.textMessage("To get started may I have your full name please?")
    ]
}

var email = async () => {
    return [
        Template.textMessage(`Thanks. Now may I have your email Id for further contact.`)
    ]
}

var errorMessage = async (user, context) => {
    let tempMsgs = [], messages = [];
    console.log("Context inside errorMessage", context)
    
    if(context == 'name')
        tempMsgs.push('Special character and numeric values are not allowed in name. kindly provide us a proper name.')

    else if(context == 'email')
        tempMsgs.push('This does not looks like a proper email. Please provide me a valid email Id.')

    
    for(let message of tempMsgs)
        messages.push(Template.textMessage(message))

    return messages;
}







/* Different variety of message using different template are defined given. Copy it and use accordingly.*/


//To take date from the user. Use disableSince to disable dates after today's date or disableUntil for opposite
var date = async () => {
    return [
        Template.textMessage("May I know when is your birthday?"),
        Template.datepicker([          
            Template.createDatepicker('disableSince', true)

       ]) 
    ]
}

//Button(clickable links) and Quick reply template
var buttonAndQr = async () => {
    return [
        Template.buttonMessage('Here is the terms and conditions', [
            Template.createWebUrlButton('View Terms and Conditions',  'https://www.opzeggen.nl/gebruiksvoorwaarden-2018?_ga=2.51113641.1645720696.1575539346-532044808.1575373511')
        ]),
        Template.quickReplyMessage('Do you agree with our terms and conditions?', [
            Template.createQuickReply('Yes', 'terms_true'),
            Template.createQuickReply('No', 'terms_false')
        ])
    ]
}

//Displays saved data in a more readable format
var getFormData = async(user) => {
    let createForm = []

    if(user.email) {
        user.email = await Hide.hideEmail(user.email)
        createForm.push(Template.createForm('Email',user.email))
    }
    if(user.name)
        createForm.push(Template.createForm('Name',user.name))
    
    return createForm
}


var error = async () => {
    return [
        Template.textMessage('Some error has been occurred. Sorry for the inconvenience. Please start again.'),
        Template.quickReplyMessage([
            Template.createQuickReply('Start Again', 'restart_true')
        ])
    ]
}

var app_crash_error = async () => {
    return [
        Template.textMessage('Some error has been occurred. We are on it.'),
        Template.textMessage('Come back later. Sorry for the inconvenience.'),
        Template.quickReplyMessage([
            Template.createQuickReply('Start Again', 'restart_true')
        ])
    ]
}

var payment = async (userData) => {
    let randomToken = uuidv4();
    let paymentUrl = `${Config.backendUrl}/payment?userId=${userData._id}&token=${randomToken}`
    
    let paymentData = {
        'userId': userData._id,
        'companyId': userData.company,
        'token': randomToken,
        'paymentUrl': paymentUrl,
        'paymentStatus': -1
    }

    let res  = await PaymentCtrl.createPaymentData(paymentData)
    let userRes = await UserCtrl.updateUserDataById(userData._id, {'paymentToken': randomToken})

    return [
        Template.buttonMessage('Great! Click the link given below to complete the payment process.', [
            Template.createWebUrlButton('Payment link',  paymentUrl)
        ])
    ]
}



module.exports = {
    welcomeAndAskName,
    email,
    date,
    buttonAndQr,
    errorMessage,
    getFormData,
    error,
    app_crash_error,
    payment
}