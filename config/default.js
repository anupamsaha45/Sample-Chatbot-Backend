/**
*
 *** @author     : Anupam Saha, Ashish Kumar
 *
 *** @date       : 19-12-2019
 *
 *** @description: Creates a token with some expiry
 * 
 **/

'use strict'
const config = {
    // jwt secret 
    jwt: {
        jwtSecret: '2MinGenie',
        tokenExpiry: 60 * 60,
        errorMsg: 'jwt expired'
    }
}

module.exports = config

