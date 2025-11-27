const clickSound = new Audio('./Audio/Tap.mp3');
clickSound.preload = "auto";


function openOrderPopup(){
    document.getElementById('orderPopup').classList.add('orderPopupOpen');
    document.getElementById('orderFilter').classList.add('show');
    clickSound.play()
}

function closeOrderPopup(){
    document.getElementById('orderPopup').classList.remove('orderPopupOpen');
    document.getElementById('orderFilter').classList.remove('show');
    clickSound.play()
}
