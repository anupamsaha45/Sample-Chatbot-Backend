/**
 *
 *** @author     : Anupam Saha, Ashish Kumar
 * 
 *** @date       : 19-12-2019 
 *
 *** @description: funtion which returns user email with hidden format .
 * 
 **/

exports.hideEmail = (email) => {

    let field = email.split("@");
    
    if (field[0].length == 1) {
        return `*${email.slice((email.indexOf('@')))}`;

    } else if (field[0].length == 2) {
        return `${field[0][0]}*${email.slice((email.indexOf('@')))}`;

    } else if (field[0].length >= 3) {
        field[0] = field[0].split("");
        for(i = 2; i < field[0].length; i++) {
            field[0][i] = '*';
        }
        return `${field[0].join("")}${email.slice((email.indexOf('@')))}`;
    }
    
    return email;

}