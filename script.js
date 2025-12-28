const contacts = document.querySelectorAll(".contact");
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatName = document.getElementById("chatName");

let currentUser = "Alex";

function loadMessages() {
  messagesDiv.innerHTML = "";
  const messages = JSON.parse(localStorage.getItem(currentUser)) || [];
  messages.forEach(msg => addMessage(msg.text, msg.type));
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.onclick = () => {
  if (!input.value.trim()) return;

  const messages = JSON.parse(localStorage.getItem(currentUser)) || [];
  messages.push({ text: input.value, type: "sent" });
  localStorage.setItem(currentUser, JSON.stringify(messages));

  addMessage(input.value, "sent");

  if (currentUser === "AI") {
    setTimeout(() => {
      const reply = "I'm your AI assistant. Ask me anything.";
      messages.push({ text: reply, type: "received" });
      localStorage.setItem(currentUser, JSON.stringify(messages));
      addMessage(reply, "received");
    }, 700);
  }

  input.value = "";
};

contacts.forEach(contact => {
  contact.onclick = () => {
    contacts.forEach(c => c.classList.remove("active"));
    contact.classList.add("active");
    currentUser = contact.dataset.user;
    chatName.textContent = currentUser;
    loadMessages();
  };
});

loadMessages();
