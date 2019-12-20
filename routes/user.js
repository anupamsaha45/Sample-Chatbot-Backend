'use strict'

const Router = require("express").Router();
const UserCtrl = require('../app/database/controllers/user');


Router.route('/user')
    .post(async function (req, res) {
        try {
            let response = await UserCtrl.createUserData(req.body);
            res.json(response);
        
        } catch (err) {
            console.log("Error in /User post", err)
            res.status(400).json({ "message": "Problem in creating User" })
            
        }
    })

    .get(async (req, res) => {
        try {
            const response = await UserCtrl.getUserData(req.query)
            res.json(response);

        } catch (err) {
            console.log("Error in /User get", err)
            res.status(400).json({ "message": "Problem in fetching User." })
        }
    })



Router.route('/user/:id')
    .get(async(req, res) => {
        try {
            if(Object.keys(req.query).length>0) {
                console.log("req", req.query)
                let query = {'_id': req.params.id}
                query = {...query, ...req.query}
                var response = await UserCtrl.getUserData(query)
            
            } else
                var response = await UserCtrl.getUserDataById(req.params.id)
            
            res.json(response);

        } catch(err) {
            console.log("Error in /User/:id get", err)
            res.status(400).json({ "message": "Problem in fetching User." })
        }
    })

    .put(async (req, res) => {
        try {
            const response = await UserCtrl.updateUserDataById(req.params.id, req.body)
            res.json(response);

        } catch (err) {
            console.log("Error in /User put", err)
            res.status(400).json({ "message": "User data updated." })
        }
    })

    .delete(async function (req, res) {
        try {
            const response = await UserCtrl.deleteUserDataById(req.params.id)
            res.json(response);

        } catch (err) {
            console.log("Error in /User delete", err)
            res.status(400).json({ "message": "Problem in deleting User." });
        }
    })



module.exports = Router


