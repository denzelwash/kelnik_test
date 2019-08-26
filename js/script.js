"use strict";

document.addEventListener('DOMContentLoaded', function () {

  // mobile-menu
  var menuBtn = document.querySelector('.js-menu-btn');
  var menu = document.querySelector('.page-header__nav');
  menuBtn.addEventListener('click', function() {
    this.classList.toggle('page-header__nav-btn--close');
    menu.classList.toggle('page-header__nav--open');
  });

});