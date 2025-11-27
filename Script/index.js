const popSound = new Audio('./Audio/PopSound.mp3');
const wooshSound = new Audio('./Audio/Woosh.mp3');
const tapSound = new Audio('./Audio/Tap.mp3');

popSound.preload = "auto";
wooshSound.preload = "auto";
tapSound.preload = "auto";

// === SIDEBAR ===
function openSide(){
    const hamburger = document.getElementById('hamburgerBtn');
    const main = document.getElementById('mainContainer');
    const sideBar = document.getElementById('profileSideBar');

    hamburger.classList.toggle("clicked");
    
    tapSound.play().catch(()=>{});

    const isOpen = hamburger.classList.contains("clicked");

    if(isOpen){
        sideBar.classList.add("sidebar-shown");
        sideBar.classList.remove("sidebar-hidden");
        main.classList.add("main-hidden");
        main.style.gridArea ="side1";
        sideBar.style.gridArea ="main";
    } 
    else {
        sideBar.classList.remove("sidebar-shown");
        sideBar.classList.add("sidebar-hidden");
        main.classList.remove("main-hidden");
        main.style.gridArea ="main";
        sideBar.style.gridArea ="side1";
    }
}

const mq = window.matchMedia('(min-width: 887px)');

function handleScreenChange(e){
    const hamburger = document.getElementById('hamburgerBtn');
    const main = document.getElementById('mainContainer');
    const sideBar = document.getElementById('profileSideBar');
    const isOpen = hamburger.classList.contains("clicked");

    if(e.matches){
        // Desktop mode fixes layout
        sideBar.classList.remove('sidebar-shown', 'sidebar-hidden');
        main.classList.remove('main-hidden');
        main.style.gridArea = "main";
        sideBar.style.gridArea = "side1";
    } 
    else if(isOpen){
        // Mobile open state
        sideBar.classList.add('sidebar-shown');
        sideBar.classList.remove('sidebar-hidden');
        main.classList.add('main-hidden');
        main.style.gridArea = "side1";
        sideBar.style.gridArea = "main";
    }
}

handleScreenChange(mq);
mq.addEventListener('change', handleScreenChange);

// === HEART ===
function clickedHeart(e){
    e.classList.toggle("clickedHeart");
    if(e.classList.contains('clickedHeart')){
        setTimeout(()=>{ popSound.play().catch(()=>{}); }, 200);
    }
}

// === COMMENTS ===
function openComment(){
    const commentTab = document.getElementById('commentTab');
    const filter = document.getElementById('darkFilter');
    wooshSound.play().catch(()=>{});
    commentTab.style.display = "flex";
    filter.style.display = "inline-block";
    commentTab.classList.add("commentTabOpen");
}

function closeToMenu(){
    const commentTab = document.getElementById('commentTab');
    const filter = document.getElementById('darkFilter');
    
    wooshSound.play().catch(()=>{});
    commentTab.classList.remove("commentTabOpen");
    commentTab.classList.add("commentTabClose");

    setTimeout(()=>{
        commentTab.style.display = "none";
        filter.style.display = "none";
        commentTab.classList.remove("commentTabClose");
    }, 400);
}

// === SAVING COMMENTS ===
const container = document.getElementById("commentTab");
const input = document.getElementById("commentAdd");
const submitBtn = document.getElementById("submit");
const username = document.getElementById("username");

loadFromLocalStorage();

submitBtn.addEventListener("click", ()=>{
    popSound.play().catch(()=>{});
    
    const inputValue = input.value.trim();
    if(inputValue === "") return;

    addMessage(username.textContent, inputValue);
    saveToLocalStorage(username.textContent, inputValue);

    input.value = "";
});

function addMessage(user, message){
    const newDiv = document.createElement("div");
    newDiv.classList.add('message');

    const newH3 = document.createElement("h3");
    newH3.textContent = user;

    const newP = document.createElement("p");
    newP.textContent = message;

    newDiv.append(newH3, newP);

    container.insertBefore(newDiv, container.lastElementChild);
}

function loadFromLocalStorage(){
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach(({user, message}) => addMessage(user, message));
}

function saveToLocalStorage(user, message){
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push({ user, message });
    localStorage.setItem("messages", JSON.stringify(messages));
}

// == Message Feature ==
const chatPopup = document.getElementById('chatPopup');
const chatName = document.getElementById('chatName');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const closeChat = document.getElementById('closeChat');
const darkFilterEl = document.getElementById('darkFilter');

let activeChatUser = null;

function getAllChats(){
  return JSON.parse(localStorage.getItem('chats')) || {};
}
function setAllChats(chats){
  localStorage.setItem('chats', JSON.stringify(chats));
}


function openChat(user){
  activeChatUser = user;
  chatName.textContent = user;

  darkFilterEl.style.display = 'inline-block';
  chatPopup.classList.add('chatPopupOpen');
  chatPopup.setAttribute('aria-hidden', 'false');

  loadChat(user);

  chatInput.focus();
}

function closeChatWindow(){
  chatPopup.classList.remove('chatPopupOpen');
  chatPopup.setAttribute('aria-hidden', 'true');
  darkFilterEl.style.display = 'none';
  activeChatUser = null;
}

function loadChat(user){
  chatMessages.innerHTML = '';
  const chats = getAllChats();
  const convo = chats[user] || [];

  convo.forEach(msg => {
    appendMessageBubble(msg.sender, msg.text, false);
  });

  chatMessages.scrollTop = chatMessages.scrollHeight;
}


function appendMessageBubble(sender, text, saveFlag){
  const bubble = document.createElement('div');
  bubble.classList.add('chatBubble');
  if(sender === 'me') bubble.classList.add('me');
  bubble.textContent = text;

  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  if(saveFlag && activeChatUser){
    const chats = getAllChats();
    if(!chats[activeChatUser]) chats[activeChatUser] = [];
    chats[activeChatUser].push({ sender, text });
    setAllChats(chats);
  }
}

function sendChatMessage(){
  const text = chatInput.value.trim();
  if(!text || !activeChatUser) return;

  appendMessageBubble('me', text, true);
  chatInput.value = '';
  popSound.play().catch(()=>{});

  setTimeout(()=>{
    const reply = "Thanks! I'll get back to you.";
    appendMessageBubble('them', reply, true);
    wooshSound.play().catch(()=>{});
  }, 700);
}

chatSend.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') sendChatMessage();
});

closeChat.addEventListener('click', closeChatWindow);
darkFilterEl.addEventListener('click', () => {
  if(chatPopup.classList.contains('chatPopupOpen')){
    closeChatWindow();
  } else {
  }
});

function attachChatOpeners(){
  document.querySelectorAll('.messageTab h4').forEach(el=>{
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const name = el.textContent.trim();
      openChat(name);
    });
  });

  document.querySelectorAll('#commentTab .message h3').forEach(el=>{
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const name = el.textContent.trim();
      openChat(name);
    });
  });
}

attachChatOpeners();