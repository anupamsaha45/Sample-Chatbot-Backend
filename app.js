const App = require('express')();
const Config = require("./config");
const Port = process.env.PORT || 3000 ;
const SocketHandler = require("./app/handlers/socket");
const Cors = require('cors');
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const Path = require("path");


Mongoose.connect(Config.mongoUrl, {useNewUrlParser : true})
.then(()=>{
    console.log('Db connected successfully')
})
.catch(e=>{
    console.log('Problem while connecting to DB')
})
  

// Middlewares
App.use(Cors());
App.use(BodyParser.urlencoded ({
    extended: false
}));
App.use(BodyParser.json());
App.set('views',Path.join(__dirname, 'views'));
App.set('view engine', 'pug')


// Use Api routes in the App
require('./routes')(App)

var Server = require('http').Server(App),
    Io = require('socket.io')(Server)


Server.listen(Port, () => {
    console.log('Server listening at', Port)
});


// socket connection
Io.on('connection', (socket) => {
    console.log('A user connected')
    socket.emit('user connected', 'user connected')

    socket.on('token', async (token, connected) => {
        SocketHandler.handle(Io, socket, token, connected)
    });
    
});