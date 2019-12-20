
'use strict'
const jwt = require('jsonwebtoken');
const config = require('config');
const { jwtSecret, tokenExpiry } = config.get('jwt');

//creates a jwt token 
async function createToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwtSecret, {
            expiresIn: tokenExpiry
        }, (error, token) => {
            if (error) 
                reject(error);
            else 
                resolve(token);
            
        })
    })
}

// verify if jwt token is valid or not
async function verifyToken(token, expiration=false) {
    if (!token) {
        const error = 'Token should not be empty'      
    }
    return new Promise((resolve, reject) => {
       
        jwt.verify(token, jwtSecret, {ignoreExpiration: expiration}, (error, decodedToken) => {
            if (error)            
                reject(error);
            else 
                resolve(decodedToken);
            
        });

    })
}

module.exports = {
    createToken,
    verifyToken
}