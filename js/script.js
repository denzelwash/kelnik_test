"use strict";
document.addEventListener('DOMContentLoaded', function () {

  // mobile-menu
  var menuBtn = document.querySelector('.js-menu-btn');
  var menu = document.querySelector('.page-header__nav');
  menuBtn.addEventListener('click', function () {
    this.classList.toggle('page-header__nav-btn--close');
    menu.classList.toggle('page-header__nav--open');
  });
  // mobile-menu end 

  // scroll-top
  var upBtn = document.querySelector('.js-up-btn');
  var scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  var oneThirdHeight = scrollHeight / 3;

  window.addEventListener('scroll', function () {
    if (pageYOffset > oneThirdHeight) upBtn.style.display = 'block';
    if (pageYOffset === 0) upBtn.style.display = 'none';
  });

  upBtn.addEventListener('click', function() {
    scrollUp();
  })

  function scrollUp() {
    if (pageYOffset != 0) {
      window.scrollBy(0, -50);
      setTimeout(scrollUp, 10);
    }
  }
  // scroll-top end


});