const sad = new Audio("./Audio/Sad.mp3");
sad.preload = "auto";

window.onload = () =>{
    sad.play()
}