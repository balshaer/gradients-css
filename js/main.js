let topbtn = document.getElementById("arrow");
let card = document.getElementsByTagName("card");
let alertTop = document.getElementById("alertTop");

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
