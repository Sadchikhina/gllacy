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

var getRandomСomments = function () {
  var comments = [];
  if (Math.random() > 0.5) {
    comments.push(COMMENTS[Math.floor(Math.random() * COMMENTS.length)]);
  }
  comments.push(COMMENTS[Math.floor(Math.random() * COMMENTS.length)]);
  return comments;
};

var getRandomLikes = function () {
  return Math.floor(Math.random() * (MAX - MIN) + MIN);
};

var template = document.querySelector('#picture-template').content;
var pictureListElement = document.querySelector('.pictures');

var renderPictures = function (elem) {
  var pictureElement = template.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', elem.url);
  pictureElement.querySelector('.picture-likes').textContent = elem.likes;
  pictureElement.querySelector('.picture-comments').textContent = elem.comments;
  return pictureElement;
};

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

document.querySelector('.gallery-overlay').classList.remove('hidden');
var gallery = document.querySelector('.gallery-overlay');

var showPhoto = function (photo) {
  var photoElement = template.cloneNode(true);
  photoElement.querySelector('.gallery-overlay-image').setAttribute('src', photo.url);
  photoElement.querySelector('.likes-count').textContent = photo.likes;
  photoElement.querySelector('.comments-count').textContent = photo.comments;
  return photoElement;
};

var photos = {
  url: 'photos/' + 1 + '.jpg',
  likes: getRandomLikes(),
  comments: getRandomСomments()
};

gallery.appendChild(showPhoto(photos));
