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
  return COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
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

var fragment = document.createDocumentFragment();
for (var i = 0; i < 25; i++) {
  var picture = {
    url: 'photos/' + i + '.jpg',
    likes: getRandomLikes(),
    // в задании сказано взять один или два комментария.
    comments: getRandomСomments()
  };
  fragment.appendChild(renderPicture(picture));
}

pictureListElement.appendChild(fragment);

document.querySelector('.gallery-overlay').classList.remove('hidden');
var gallery = document.querySelector('.gallery-overlay');

gallery.appendChild(renderPicture(picture[0]));
