const Config = require("./index");
const Mongoose = require("mongoose");

module.exports = function(app) {
    Mongoose.connect(Config.mongoUrl, {
        useNewUrlParser: true
    }, function(error) {
         if(error) console.log(error);
         console.log("connection to mongoose successful");
        // If no error, successfully connected
    });
    Mongoose.Promise = global.Promise;

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);

    if (app) {
        app.set("mongoose", Mongoose);
    }
};

function cleanup() {
    Mongoose.connection.close(function() {
        process.exit(0);
    });
}