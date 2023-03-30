const socket = io("http://localhost:8000");

const form= document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio=new Audio('ting.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message'); //append message
    messageElement.classList.add(position); //set position
    messageContainer.append(messageElement);
    if(position=='left')
        audio.play();     //plays audio if pos is left..
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();  // page doesnt reload
    const message = messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);  // socket sends the message
    messageInput.value='';  // the message box again gets empty
})
const name = prompt("Enter Your Name to Join","Stranger");
socket.emit('new-user-joined',name);

socket.on('user-joined',data=>{
    append(`${name} joined the chat`,'right')
})
socket.on('receive',data=>{
    append(` ${data.name}: ${data.message}`,'left')
})
socket.on('left',name=>{
    append(`${name} left the chat`,'right')
})