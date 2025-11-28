const signupBtn = document.querySelector(".navBtns .signup");
const loginBtn = document.querySelector(".navBtns .login");
const loginForm = document.querySelector(".loginForm");
const signupForm = document.querySelector(".signupForm");
const bgObj1 = document.getElementById(`backgroundObject1`);
const bgObj2 = document.getElementById(`backgroundObject2`);
const bgObj3 = document.getElementById(`backgroundObject3`);
const pressSound = new Audio(`./Audio/Press.mp3`);
const tapSound = new Audio('./Audio/Tap.mp3');
const loadWithDark = document.getElementById(`loadingWithDark`);
const darkF = document.getElementById(`darkFilter`);
const loadBar = document.getElementById(`loadingBar`);
const approveSound = new Audio(`./Audio/Approve.mp3`);
pressSound.preload = "auto";
tapSound.preload = "auto";
approveSound.preload = "auto";
function animateBg(obj, anim) {
    obj.style.animation = "none";
    void obj.offsetWidth; 
    obj.style.animation = anim;
}

function showLogin() {
    loginForm.style.display = "flex";
    signupForm.style.display = "none";
    loginBtn.style.backgroundColor = "var(--primary_color)"
    signupBtn.style.backgroundColor = "hsl(from var(--primary_color) h s calc(l + 40))";
    loginBtn.classList.add("colorBtn")
    signupBtn.classList.remove("colorBtn")
    loginForm.classList.add("pop")
    signupForm.classList.remove("pop")

    pressSound.play();
    
    animateBg(bgObj1, "animBgMove3 reverse 1.2s ease-in-out forwards");
    animateBg(bgObj2, "animBgMove2 reverse 1.2s ease-in-out forwards");
    animateBg(bgObj3, "animBgMove1 reverse 1.2s ease-in-out forwards");
}

function showSignup() {
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
    signupBtn.style.backgroundColor = "var(--primary_color)"
    loginBtn.style.backgroundColor = "hsl(from var(--primary_color) h s calc(l + 40))"
    signupBtn.classList.add("colorBtn")
    loginBtn.classList.remove("colorBtn")
    signupForm.classList.add("pop")
    loginForm.classList.remove("pop")
    pressSound.play();
    animateBg(bgObj1, "animBgMove3 1.2s ease-in-out forwards");
    animateBg(bgObj2, "animBgMove2 1.2s ease-in-out forwards");
    animateBg(bgObj3, "animBgMove1 1.2s ease-in-out forwards");
}

loginBtn.addEventListener("click", showLogin);
signupBtn.addEventListener("click", showSignup);
showLogin()


// Data Processing
const loginFormTag = document.querySelector(".loginForm form");
const signupFormTag = document.querySelector(".signupForm form");

signupFormTag.addEventListener("submit", e => {
    tapSound.play()
    e.preventDefault();
    const username = signupFormTag.querySelector("input[name='userName']").value.trim();
    const password = signupFormTag.querySelector("input[name='password']").value.trim();
    const email = signupFormTag.querySelector("input[name='email']").value.trim();

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const exists = accounts.find(acc => acc.username === username);
    if (exists) return alert("Username already exists");

    accounts.push({ username, password, email });
    localStorage.setItem("accounts", JSON.stringify(accounts));

    localStorage.setItem("loggedInUser", username);
    loadWithDark.style.display = "flex";
    loadWithDark.style.zIndex = "10";
    loadBar.style.display = "flex";
    darkF.style.display = "block";
    approveSound.play()
    setTimeout(()=>{
        window.location.href = "index.html";
    },4000)
    
});

loginFormTag.addEventListener("submit", e => {
    e.preventDefault();
    tapSound.play()
    const username = loginFormTag.querySelector("input[name='userName']").value.trim();
    const password = loginFormTag.querySelector("input[name='password']").value.trim();

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const user = accounts.find(acc => acc.username === username && acc.password === password);
    if (!user) return alert("Invalid username or password");

    localStorage.setItem("loggedInUser", username);
    loadWithDark.style.display = "flex";
    loadWithDark.style.zIndex = "10";
    loadBar.style.display = "flex";
    darkF.style.display = "block";
    approveSound.play()
    setTimeout(()=>{
        window.location.href = "index.html";
    },4000)
});
