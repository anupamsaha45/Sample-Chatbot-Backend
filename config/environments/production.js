
module.exports = {
    port: process.env.PORT, 
    mongoUrl: process.env.CONNECTION_STRING,
    backendUrl: process.env.BACKEND_URL,
    dfProjectId:process.env.PROJECT_ID,
    dfSessionId:process.env.SESSION_ID,
    dfPrivateKey:process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    dfClientEmail:process.env.CLIENT_EMAIL,
    senderEmail: process.env.SENDER_EMAIL,
    senderPassword: process.env.SENDER_PASSWORD,
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN
};
