function displayChat(chat) {
  const chatBox = document.querySelector(".chat-box");
  const p = document.createElement("p");
  p.classList.add("p");
  p.innerText = `${chat.content}`;
  chatBox.appendChild(p);
}

async function readChat() {
  //데이터를 읽어오는 것
  const res = await fetch("/chat");
  const resJson = await res.json();
  const chatBox = document.querySelector(".chat-box");
  chatBox.innerText = "";
  resJson.forEach(displayChat);
}

async function createChat(value) {
  //새로운 데이터를 서버에 저장하는 것 (생성)
  const res = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: value,
    }),
  });
  const resJson = await res.json();
  readChat();
}

function handelchat(event) {
  event.preventDefault();
  const content = document.querySelector("#chat-input");
  createChat(content.value);
  content.value = "";
}

readChat();

const chat = document.querySelector("#chat-form");
chat.addEventListener("submit", handelchat);
