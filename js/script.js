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

  upBtn.addEventListener('click', function () {
    scrollUp();
  });

  function scrollUp() {
    if (pageYOffset != 0) {
      window.scrollBy(0, -50);
      setTimeout(scrollUp, 10);
    }
  };
  // scroll-top end



  // filter
  var filter = document.querySelector('.js-filter');
  var cardsContainer = document.querySelector('.cards');
  var priceTop = false;
  var roomTop = false;

  filter.addEventListener('click', function (e) {
    if (e.target.tagName != 'LI') return;
    var lis = this.children;
    var sortType = e.target.dataset.filter;
    var cards = [].slice.apply(document.querySelectorAll('.cards__item'));

    for (var i = 0; i < lis.length; i++) {
      lis[i].classList.remove('search-result__switcher-item--active');
    }

    sortCards(cards, sortType, e.target);
  });

  function sortCards(arr, dataAttr, switcher) {
    var sortedArr;
    switch (dataAttr) {

      case 'price':
        sortedArr = arr.sort(function (a, b) {
          a = parseInt(a.querySelector('.cards__price').textContent.replace(/\s/g, ''));
          b = parseInt(b.querySelector('.cards__price').textContent.replace(/\s/g, ''));
          return a - b;
        });
        if (priceTop === true) sortedArr = sortedArr.reverse();
        priceTop = !priceTop;
        break;

      case 'room':
        sortedArr = arr.sort(function (a, b) {
          return a.dataset.room - b.dataset.room;
        });
        if (roomTop === true) sortedArr = sortedArr.reverse();
        roomTop = !roomTop;
        break;
    }

    sortedArr.forEach(function (elem) {
      cardsContainer.appendChild(elem);
    });

    switcher.classList.add('search-result__switcher-item--active');
    switcher.classList.toggle('search-result__switcher-item--rotate');
  };
  // filter end



  // email
  var formEmail = document.querySelector('.subscribe__email');
  var reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,6}$/i;
  formEmail.addEventListener('input', function () {
    if (reg.test(formEmail.value) === false) {
      formEmail.setCustomValidity('Введите корректный e-mail');
    } else {
      formEmail.setCustomValidity('');
    }
  });
  // email end



  // ajax
  var showMoreBtn = document.querySelector('.js-more-btn');

  showMoreBtn.addEventListener('click', ajaxLoad);

  function appendCards(cards) {
    cards.forEach(function (elem) {
      cardsContainer.insertAdjacentElement('beforeend', elem);
    });
    showMoreBtn.style.display = 'none';
    setFavouritesHandlers();
  };

  function ajaxLoad() {
    var xhr = new XMLHttpRequest();
    var tempElement = document.createElement('div');

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        tempElement.innerHTML = xhr.response;
        var dataArr = [].slice.apply(tempElement.children);
        appendCards(dataArr);
      } else {
        console.log('Error');
      }
    });

    xhr.open('GET', 'ajaxload.html');
    xhr.send();
  }
  // ajax end



  // favourites
  var favouritesAlert = document.querySelector('.favourites-alert');

  function setFavouritesHandlers() {
    var favouritesBtns = document.querySelectorAll('.js-favourites-btn');
    for (var i = 0; i < favouritesBtns.length; i++) {
      favouritesBtns[i].addEventListener('click', function () {
        this.classList.toggle('cards__favourites--added');
        var title = this.parentElement.nextElementSibling.querySelector('.cards__title').textContent;

        if (this.classList.contains('cards__favourites--added')) {
          favouritesAlert.innerHTML = title + ' добавлена в избранное';
          favouritesAlert.style.display = 'block';
          setTimeout(function () {
            favouritesAlert.style.display = 'none';
          }, 1500)
        }
      })
    }
  }
  setFavouritesHandlers();
  // favourites end

});