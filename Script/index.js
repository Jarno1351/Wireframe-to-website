const popSound = new Audio('./Audio/PopSound.mp3');
const wooshSound = new Audio('./Audio/Woosh.mp3');
popSound.preload = "auto";
wooshSound.preload = "auto";

function openSide(){
    const hamburger = document.getElementById(`hamburgerBtn`);
    const main = document.getElementById(`mainContainer`);
    const sideBar = document.getElementById(`profileSideBar`);
    console.log(hamburger.classList)
    console.log(main.classList)
    console.log(sideBar.classList)
    hamburger.classList.toggle("clicked")
    sideBar.classList.toggle('sidebar-shown');
    sideBar.classList.toggle('sidebar-hidden');
    main.classList.toggle('main-hidden');
    wooshSound.play()
    if(hamburger.classList[0] === "clicked"){
        main.style.gridArea ="side1"
        sideBar.style.gridArea ="main"
    }
    else{
        main.style.gridArea ="main"
        sideBar.style.gridArea ="side1"
    }
    
    
}
const mq = window.matchMedia('(min-width: 887px)');
function handleScreenChange(e){
    const hamburger = document.getElementById(`hamburgerBtn`);
    const main = document.getElementById(`mainContainer`);
    const sideBar = document.getElementById(`profileSideBar`);
    if(e.matches && hamburger.classList[0] === "clicked"){
        sideBar.classList.remove('sidebar-shown', 'sidebar-hidden');
        main.classList.remove('main-hidden');

        main.style.gridArea = "main";
        sideBar.style.gridArea = "side1";
    }
    else if(!e.matches && hamburger.classList[0] === "clicked"){
        sideBar.classList.toggle('sidebar-shown');
        sideBar.classList.toggle('sidebar-hidden');
        main.classList.toggle('main-hidden');
        main.style.gridArea = "side1";
        sideBar.style.gridArea = "main";
    }
    
}

function clickedHeart(e){
    e.classList.toggle("clickedHeart");
    if(e.classList.contains('clickedHeart')){
        setTimeout(()=>{popSound.play();},200)
    }
    else{
        
    }
}

function openComment(){
    const commentTab = document.getElementById(`commentTab`);
    const filter = document.getElementById(`darkFilter`);
    commentTab.classList.add("commentTabOpen");
    wooshSound.play()
    commentTab.style.display = "flex";
    filter.style.display = "inline-block"
}
function closeToMenu(){
    const commentTab = document.getElementById(`commentTab`);
    const filter = document.getElementById(`darkFilter`);
    wooshSound.play()
    commentTab.classList.remove("commentTabOpen");
    commentTab.classList.toggle("commentTabClose");
    console.log(commentTab.className)
    setTimeout(()=>{
        commentTab.style.display = "none";
        filter.style.display = "none"
        commentTab.classList.toggle("commentTabClose");
    },400);
    wooshSound.pause();
    wooshSound.currentTime = 0;
    
}
handleScreenChange(mq);
mq.addEventListener('change', handleScreenChange);

// For adding comments
const container = document.getElementById("commentTab");
const input = document.getElementById("commentAdd");
const submitBtn = document.getElementById("submit");
const lastItem = container.lastElementChild;
loadFromLocalStorage();

submitBtn.addEventListener("click", ()=>{
    popSound.play();
    const username = document.getElementById(`username`)
    const inputValue = input.value.trim()
    if (inputValue === ""){return};
    const newDiv = document.createElement("div");
    newDiv.classList.add('message');
    const newH3 = document.createElement("h3");
    newH3.textContent = username.textContent
    const newP = document.createElement("p");
    newP.textContent = inputValue
    newDiv.append(newH3)
    newDiv.append(newP);
    container.insertBefore(newDiv, lastItem);

    saveToLocalStorage(username.textContent, inputValue);
    input.value = ""; 
})

function loadFromLocalStorage(){
    const messages = JSON.parse(localStorage.getItem("messages")) || [];

    messages.forEach(({user,message})=>{
        const newDiv = document.createElement("div");
        newDiv.classList.add('message');
        const newH3 = document.createElement("h3");
        newH3.textContent = user
        const newP = document.createElement("p");
        newP.textContent = message
        newDiv.append(newH3,newP);
        container.insertBefore(newDiv, lastItem);

    })
}
function saveToLocalStorage(user, message) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    messages.push({ user, message });
    localStorage.setItem("messages", JSON.stringify(messages));
}