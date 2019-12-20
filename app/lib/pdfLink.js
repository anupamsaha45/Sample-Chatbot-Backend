const Config = require("../../config")
const Pdf = require('pdfkit')
const Fs = require('fs')
const Path = require('path');

/**
 *
 *** @author	 : Anupam Saha, Ashish Kumar
 *
 *** @date		 : 19-12-2019 
 *
 *** @description: Generate the pdf which will be saved in /pdf folder.
 *
 **/


exports.generatePdfLink = async (userData) => { 
    return new Promise((resolve, reject) => {

        let details = `Name: ${userData.name}\nAddress: ${userData.address}\nEmail: ${userData.email}\nPhone: ${userData.phone}`

        var myDoc = new Pdf;
        let filename = Date.now();
        var file = Path.join(__dirname, `../../pdf/${filename}.pdf`)

        myDoc.pipe(Fs.createWriteStream(file))

        myDoc.font('Times-Roman')
        .fontSize(10)
        .text(`${userData.name}` , 50, 50)
        .moveDown(0.5)
        .text(`${userData.address}`)
        .moveDown(6)
        .text(`xyz company\nAbc Colony\nAmsterdam.`)
        .moveDown(3)
        .text(`Amsterdam, ${(new Date()).toISOString().split('T')[0]}`)
        .moveDown(1)
        .text(`Concerns: Termination of participation in xyz company`)
        .moveDown(2)
        .text(`Dear Sir / Madam`)
        .moveDown(1)
        .text(`I hereby cancel the automatic play along with your lottery for the next possibility after the date.\n`)
        .moveDown(0.7)
        .text(`${details}`)
        .moveDown(1)
        .text(`The debit authorization must be terminated at the same time.`)
        .moveDown(1)
        .text(`In addition, I hereby request that, in accordance with Article 17 of the AVG, you proceed to immediate deletion of all my personal data in the sense of article 4 (1) GTC, except in the cases such as listed in Article 17 (3) AVG.`)
        .moveDown(1)
        .text(`I look forward to the confirmation of this cancellation and the deletion of my personal data.`)
        .moveDown(2)
        .text(`Sincerely`)
        .moveDown(0.5)
        .text(`${userData.name}`)
        .moveDown(0.3)
        myDoc.font('Times-BoldItalic')
        .text(userData.name, {
            characterSpacing:2
          })
    
        myDoc.end();
        
        resolve(`${Config.backendUrl}/download?filename=${filename}`) //Returns pdfLink to the calling function.
    })  
}