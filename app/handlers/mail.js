const Config = require("../../config/index");

// const Nodemailer = require('nodemailer');
// var transporter = Nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     auth: {
//         user: 'contractterminator@gmail.com',
//         pass: 'contractterminator@123'
//     }
// });

const Mailgun = require("mailgun-js");
const mg = Mailgun({apiKey: Config.mailgunApiKey, domain: Config.mailgunDomain});


exports.sendMail = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            mailOptions = {
                from: 'Contract Terminator <contractterminator@gmail.com>',
                to: user.email,
                subject: `Subscription cancellation`,
                html: `Hello, you have successfully paid for the cancellation of xyz<br><br> Here is the link to download your pdf.<br><a href=${user.pdfLink} target='_blank'>Download Pdf</a>`
            }

            mg.messages().send(mailOptions, function (error, body) {
                console.log(body);
                resolve(body)
            });
            // transporter.sendMail(mailOptions, function (error, response) {
            //     if (error) {
            //         reject(error)

            //     } else {
            //         resolve(response)
            //     }
            // });

        } catch (err) {
            reject(err)
        }
    })
}