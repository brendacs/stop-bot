// nav
const hamburger = document.querySelector('.hamburger');
const navlist = document.querySelector('.nav-list');

// toggle active state and visibility
hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('is-active');
  navlist.classList.toggle('list-out');
  navlist.classList.toggle('list-in');
});

// home link
$("#home-link").click(function(){
  $("#about").fadeOut(0);
  $("#landing").fadeIn(700);
});

// about link
$("#about-link").click(function(){
  $("#landing").fadeOut(0);
  $("#about").fadeIn(700);
});

// close menu after selection
navlist.addEventListener('click', function() {
  setTimeout(function() {
    hamburger.classList.remove('is-active');
    navlist.classList.add('list-out');
    navlist.classList.remove('list-in');
  }, 400);
});
