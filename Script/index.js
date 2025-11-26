const popSound = new Audio('../Audio/PopSound.mp3');
const wooshSound = new Audio('../Audio/Woosh.mp3');
popSound.preload = "auto"

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
    
}
handleScreenChange(mq);
mq.addEventListener('change', handleScreenChange);