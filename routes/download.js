'use strict'

const Router = require("express").Router();
const Path = require('path');


Router.route('/download')
   .get(async (req, res) => {
        try {
            const file = Path.join(__dirname, `../pdf/${req.query.filename}.pdf`)
            res.download(file); 

        } catch (err) {
            console.log("Error in /User get", err)
            res.status(400).json({ "message": "Problem in fetching User." })
        }
    })


module.exports = Router
