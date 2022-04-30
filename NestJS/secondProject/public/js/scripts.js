const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

const header = getElementById('hello_stranger');
const chattingBox = getElementById('chatting_box');
const formElement = getElementById('chat_form');

socket.on('connected_user', (username) => {
  console.log(username);
});

function helloUser() {
  const userName = prompt('What is your name?');

  const drawHelloStranger = (username) => {
    header.innerText = `Hello ${username} Stranger`;
  };
  // 리턴값으로 응답 받기
  socket.emit('new_user', userName, (username) => {
    drawHelloStranger(username);
  });
}

function init() {
  helloUser();
}

init();
