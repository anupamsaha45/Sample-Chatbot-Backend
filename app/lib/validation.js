/**
 *
 *** @author	 : Anupam Saha, Ashish Kumar
 *
 *** @date		 : 19-12-2019 
 *
 *** @description: Checks the validation for various user input and returns accordingly.
 *                 Returns false in case of error and true in case of no error
 *
 **/

//regular expressions
const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
const email_format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



var welcomeAndAskName = (name) => {
    if(!specialChars.test(name) && !(/[0-9]/.test(name)))
        return name
    else
        return false
}

var email = (email) => {
    if(email_format.test(email))
        return email
    else
        return false
}

var phone = (phone) => {
    if(!specialChars.test(phone) && phone.trim().length==10 && !(/[a-zA-Z]/.test(phone)))
        return phone
    else
        return false
}


module.exports = {
    welcomeAndAskName,
    email,
    phone
}
