'use strict';

var MIN = 15;
var MAX = 200;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var createPhotos = function () {

  /**
   * Создает рандомное количество комментариев
   * @return {Array}
   */
  var getRandomСomments = function () {
    var comments = [];
    if (Math.random() > 0.5) {
      comments.push(COMMENTS[Math.floor(Math.random() * COMMENTS.length)]);
    }
    comments.push(COMMENTS[Math.floor(Math.random() * COMMENTS.length)]);
    return comments;
  };

  /**
   * Создает рандомное количество лайков
   * @return {number}
   */
  var getRandomLikes = function () {
    return Math.floor(Math.random() * (MAX - MIN) + MIN);
  };

  var template = document.querySelector('#picture-template').content;
  var pictureListElement = document.querySelector('.pictures');

  /**
   * Создает DOM-элемент превью картинки
   * @param {Object} elem
   * @return {Object}
   */
  var renderPictures = function (elem) {
    var pictureElement = template.cloneNode(true);
    pictureElement.querySelector('img').setAttribute('src', elem.url);
    pictureElement.querySelector('.picture-likes').textContent = elem.likes;
    pictureElement.querySelector('.picture-comments').textContent = elem.comments;
    return pictureElement;
  };

  /**
   * Создает массив из 25 картинок
   * @param {Array.<picture>}
   */
  var picture = [];

  var fragment = document.createDocumentFragment();
  for (var i = 1; i < 26; i++) {
    picture[i] = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomLikes(),
      comments: getRandomСomments()
    };
    fragment.appendChild(renderPictures(picture[i]));
  }

  pictureListElement.appendChild(fragment);

  /**
   * Создает DOM-элемент картинку
   * @param {Object} photo
   */
  var showPhoto = function (photo) {
    var photoElement = document.querySelector('.gallery-overlay');
    photoElement.querySelector('.gallery-overlay-image').setAttribute('src', photo.url);
    photoElement.querySelector('.likes-count').textContent = photo.likes;
    photoElement.querySelector('.comments-count').textContent = photo.comments.length;
  };

  showPhoto(picture[1]);

};

createPhotos();

/**
 * Загрузка изображения и показ формы редактирования
 */

var inputUpload = document.querySelector('#upload-file');
var editor = document.querySelector('.upload-overlay');
var editorClose = document.querySelector('.upload-form-cancel');

var openEditor = function () {
  editor.classList.remove('hidden');
};

var closeEditor = function () {
   editor.classList.add('hidden');
}

inputUpload.addEventListener('change', function () {
  openEditor();
});

editorClose.addEventListener('click', function () {
  closeEditor();
  editorClose.reset();
});

/**
 * Применение эффекта для изображения и Редактирование размера изображения
 *
 * Функция для последующего вычисления пропорции положение ползунка/сила эффекта
 * var getMaxEffect = function (arr) {
   var maxEffect = arr[0];
   for (var i = 0; i < arr.length; i++) {
     if (arr[i] > maxEffect) {
       maxEffect = arr[i];
     }
   }
   return maxEffect;
 };
 *
 */

var sliderPin = document.querySelector('.upload-effect-level-pin');

sliderPin.addEventListener('mouseup', function () {
});


/**
 * Изменение эффектов при нажатии на фильтры
 */

var imagePreview = document.querySelector('.effect-image-preview');
var effectControl = document.querySelector('.upload-effect-controls');
var chrome = effectControl.querySelector('.upload-effect-label-chrome');
var sepia = effectControl.querySelector('.upload-effect-label-sepia');
var marvin = effectControl.querySelector('.upload-effect-label-marvin');
var phobos = effectControl.querySelector('.upload-effect-label-phobos');
var heat = effectControl.querySelector('.upload-effect-label-heat');

chrome.addEventListener('click', function () {
  imagePreview.classList.add('.effect-chrome');
});

sepia.addEventListener('click', function () {
  imagePreview.classList.add('.effect-sepia');
});

marvin.addEventListener('click', function () {
  imagePreview.classList.add('.effect-marvin');
});

phobos.addEventListener('click', function () {
  imagePreview.classList.add('.effect-phobos');
});

heat.addEventListener('click', function () {
  imagePreview.classList.add('.effect-heat');
});


/**
 * Изменение размера изображения
 */

/**
 * Показ изображения в полноэкранном режиме
 */
