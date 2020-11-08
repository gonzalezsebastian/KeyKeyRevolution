const socket = io();// Código del frontend que envía los eventos al servidor 
//Codigo del cliente DOM ELEMENTS
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click',function(){
    socket.emit('chat:message',{
        message: message.value,
        username: username.value
    })
    console.log(username.value,message.value);
});

message.addEventListener('keypress',function(){
    socket.emit('chat:typing',username.value);
})
//Escuchando
socket.on('chat:message',function(datos){
   actions.innerHTML = ''; 
   output.innerHTML += `<p> 
        <strong>${datos.username}</strong>:${datos.message}
   </p>`
});
socket.on('chat:typing',function(datos){
    actions.innerHTML =`<p> 
    <em>${datos} está escribiendo un mensaje.</em></p>`
})
