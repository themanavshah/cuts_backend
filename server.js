const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./auth/config/db');
const passport = require('passport');
const http = require('http');

const socketio = require('socket.io');
//const { Socket } = require('net');

const routes = require('./auth/routes/index.js');

const { stripe_payment } = require('./stripe_payments/payment.js');

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//auth system login/resgister stuff
app.use(routes);
app.use(passport.initialize());
require('./auth/config/passport')(passport);

//for realtime chat based system, but not yet E2EE integreated
//use signal protocol
const server = http.createServer(app);
const io = socketio(server);

var connectedSocket = [];

io.on('connection', socket => {
    connectedSocket.push(socket);
    console.log('New web socket connection...')
    console.log(socket.id, " has joined.")
    socket.on("/test", (msg) => {
        console.log(msg);
    })
    socket.on("/buttonmsg", (msg) => {
        console.log("buttonmsg: " + msg.message);
        console.log("to: " + msg.sentTo);
        socket.emit("/fromsocket", msg)
    })
})

//stripe payment which is yet incomplete from flutter side
app.use('/stripe_pay', stripe_payment);

const PORT = process.env.PORT || 6969;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`))