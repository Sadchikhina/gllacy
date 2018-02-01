'use strict';

var MIN = 15;
var MAX = 200;
var COMMENT_1 = 'Всё отлично!';
var COMMENT_2 = 'В целом всё неплохо. Но не всё.';
var COMMENT_3 = 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.';
var COMMENT_4 = 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.';
var COMMENT_5 = 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.';
var COMMENT_6 = 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';

var comments = [COMMENT_1, COMMENT_2, COMMENT_3, COMMENT_4, COMMENT_5, COMMENT_6];

var getRandomСomments = function () {
  return comments[Math.floor(Math.random() * comments.length)];
};

var getRandomLikes = function () {
  return Math.floor(Math.random() * (MAX - MIN) + MIN);
};

var template = document.querySelector('#picture-template').content;
var pictureListElement = document.querySelector('.pictures');

var renderPicture = function (elem) {
  var pictureElement = template.cloneNode(true);
  pictureElement.setAttribute('src', 'url');
  pictureElement.querySelector('.picture-likes').textContent = elem.likes;
  pictureElement.querySelector('.picture-comments').textContent = elem.comments;
  return pictureElement;
};

var picture = {
  url: 'photos/' + i + '.jpg',
  likes: getRandomLikes(),
  // в задании сказано взять один или два комментария.
  comments: getRandomСomments()
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < 25; i++) {
  fragment.appendChild(renderPicture(picture[i]));
}

pictureListElement.appendChild(fragment);

document.querySelector('.gallery-overlay').classList.remove('hidden');
