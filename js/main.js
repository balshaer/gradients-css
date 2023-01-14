let topbtn = document.getElementById("arrow");
let card = document.getElementsByTagName("card");
let alertTop = document.getElementById("alertTop");
let modeBtn = document.getElementById('mode');
let logoimg = document.getElementById('logoimg');

modeBtn.onchange = (e) => {
  if (modeBtn.checked === true) {
 
document.querySelector('body').classList.toggle("lightmode");

  } else {
    document.querySelector('body').className="dark";


  }
}

const mode = window.localStorage.getItem('mode');
if (mode == 'dark') {
  modeBtn.checked = true;
  document.querySelector('body').classList.toggle("lightmode");


}

if (mode == 'light') {
  modeBtn.checked = false;
  document.querySelector('body').className="dark";



}




window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topbtn.style.display = "block";
  } else {
    topbtn.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function alert() {
  document.getElementById("alertTop").style.top = "-60px";
}
