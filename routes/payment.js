const Router = require("express").Router();
const UserCtrl = require('../app/database/controllers/user');
const SocketHand = require("../app/handlers/socket")
const fs = require('fs')


Router.route('/payment')
    .get(async function (req, res) {
        try {
            let resUser = await UserCtrl.getUserDataById(req.query.userId, true)
            if(resUser.paymentToken == req.query.token) {
                req.query.amount = resUser.company.amount
                res.render("index", req.query); 

            } else {
                SocketHand.payment('oldLink', req.query)  
                res.writeHead(200, {'Content-Type': 'text/html'});
                var myReadStream = fs.createReadStream(__dirname+'/close.html', 'utf8');
                myReadStream.pipe(res);
            }

        } catch (err) {
            console.log("Error in /User post", err)
            res.status(400).json({ "message": "Problem in creating User" })
            
        }
    })

Router.route('/payment/charge')
    .post(async function (req, res) {
        try {
            let resData = await UserCtrl.getUserDataById(req.query.userId, true)
            console.log("Response in /payment/charge", resData)
            let amount = resData.company.amount

            let data = await stripe.customers.create({
                email: req.body.stripeEmail, // customer email, which user need to enter while making payment
                source: req.body.stripeToken,
                name:'Bot',
                address:{
                    "city": 'Bangalore',
                    "country": 'N/A',
                    "line1": 'HSR Layout',
                    "line2": 'Kormanagala',
                    "postal_code": '560102',
                    "state": 'Karnataka'
                  }
            })
            
            let customer = await stripe.charges.create({ // charge the customer
                amount,
                description: "Test Charge",
                currency: "USD",
                customer: data.id,
                
            })
            
            req.query.amount = amount                     
            if(customer.paid) {
                req.query.refUrl = customer.receipt_url
                SocketHand.payment('paid', req.query)
            
            } else 
                SocketHand.payment('failed', req.query)
			
            
            res.writeHead(200, {'Content-Type': 'text/html'});
			var myReadStream = fs.createReadStream(__dirname+'/close.html', 'utf8');
			myReadStream.pipe(res);
        
        } catch (err) {
            console.log("Error in /User post", err)
            res.status(400).json({ "message": "Problem in creating User" })
            
        }
    })



module.exports = Router


