const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

const header = getElementById('hello_stranger');
const chattingBox = getElementById('chatting_box');
const formElement = getElementById('chat_form');

socket.on('connected_user', (username) => {
  drawNewChat(`${username} connected!`);
});

socket.on('new_chat', (data) => {
  const { context, username } = data;
  drawNewChat(`${username}: ${context}`);
});

function handleSubmit(e) {
  e.preventDefault();
  context = e.target.elements[0].value;
  e.target.elements[0].value = '';

  if (context !== '') {
    socket.emit('chat', context);
    drawNewChat(`나: ${context}`);
  }
}

function helloUser() {
  const userName = prompt('What is your name?');

  // 리턴값으로 응답 받기
  socket.emit('new_user', userName, (username) => {
    drawHelloStranger(username);
  });
}
function drawNewChat(message) {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `<div>${message}</div>`;

  wrapperChatBox.innerHTML = chatBox;
  chattingBox.append(wrapperChatBox);
}

const drawHelloStranger = (username) => {
  header.innerText = `Hello ${username} Stranger`;
};
function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();
