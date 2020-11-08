const path = require('path');
const express = require('express');
const app = express();
//configuracion

app.set('port', process.env.PORT || 3000);
//static files

app.use(express.static(path.join(__dirname,'public')));
//Inicializar el servidor

const server = app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
})
//web sockets
const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('new connection',socket.id)

    socket.on('chat:message',(datos)=>{
        io.sockets.emit('chat:message',datos);
    })
    socket.on('chat:typing',datos=>{
        socket.broadcast.emit('chat:typing',datos);
    })
})
