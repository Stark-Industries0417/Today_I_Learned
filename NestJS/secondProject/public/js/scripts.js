const socket = io('/');

const getElementById = (id) => document.getElementById(id) || null;

const header = getElementById('hello_stranger');
const chattingBox = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function helloUser() {
  const userName = prompt('What is your name?');
  // 리턴값으로 응답 받기
  socket.emit('new_user', userName, (data) => {
    console.log(data);
  });

  // 서버의 socket.emit 의 값 받기
  socket.on('hello_user', (data) => {
    console.log(data);
  });
}

function init() {
  helloUser();
}

init();
