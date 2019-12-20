'use strict';

const User = require("./user")
const Download = require("./download")
const Payment = require("./payment")


module.exports = (app) => {
    app.use(User)
    app.use(Download)
    app.use(Payment)
};