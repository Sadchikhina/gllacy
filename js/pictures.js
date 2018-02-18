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

var picture = [];
var gallery = document.querySelector('.gallery-overlay');
var galleryClose = gallery.querySelector('.gallery-overlay-close');

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
  pictureElement.querySelector('img').setAttribute('data-id', elem.id);
  pictureElement.querySelector('img').setAttribute('src', elem.url);
  pictureElement.querySelector('.picture-likes').textContent = elem.likes;
  pictureElement.querySelector('.picture-comments').textContent = elem.comments;
  return pictureElement;
};

/**
 * Создает DOM-элемент картинку
 * @param {Object} id
 */
var showPhoto = function (id) {
  var photoElement = document.querySelector('.gallery-overlay');
  photoElement.querySelector('.gallery-overlay-image').setAttribute('data-id', picture[id].id);
  photoElement.querySelector('.gallery-overlay-image').setAttribute('src', picture[id].url);
  photoElement.querySelector('.likes-count').textContent = picture[id].likes;
  photoElement.querySelector('.comments-count').textContent = picture[id].comments.length;
};

var createPhotos = function () {

  /**
   * Создает массив из 25 картинок
   * @param {Array.<picture>}
   */
  var fragment = document.createDocumentFragment();
  for (var i = 1; i < 26; i++) {
    picture[i] = {
      id: i,
      url: 'photos/' + i + '.jpg',
      likes: getRandomLikes(),
      comments: getRandomСomments()
    };
    fragment.appendChild(renderPictures(picture[i]));
  }
  pictureListElement.appendChild(fragment);
};
createPhotos();

var pictureClickHandler = function (evt) {
  evt.preventDefault();
  var target = evt.target.dataset.id;
  gallery.classList.remove('hidden');
  document.addEventListener('keydown', closeGalleryHandler);
  showPhoto(target);
};

var addPictureHandlers = function () {

  var picturePreview = document.querySelectorAll('a.picture');
  for (var i = 0; i < picturePreview.length; i++) {
    picturePreview[i].addEventListener('click', pictureClickHandler);
  }
};
addPictureHandlers();

/**
   * Закрывает окно по нажатию на ESC
   * @param  {type} evt
   */
var closeGalleryHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeGallery();
  }
};

/**
 * Закрывает окно по клику
 */
var closeGallery = function () {
  gallery.classList.add('hidden');
  gallery.removeEventListener('keydown', closeGalleryHandler);
};

galleryClose.addEventListener('click', function () {
  closeGallery();
});

/**
 * Загрузка изображения и показ формы редактирования
 */
var inputUpload = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.upload-form');
var editor = document.querySelector('.upload-overlay');
var editorClose = editor.querySelector('.upload-form-cancel');

var ESC_KEYCODE = 27;

var showForm = function () {


  /**
   * Закрывает окно по нажатию на ESC
   * @param  {type} evt
   */
  var openEditorHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeEditor();
    }
  };

  /**
 * Открывает окно, закрывает по нажатию на ESC
  */
  var openEditor = function () {
    editor.classList.remove('hidden');
    document.addEventListener('keydown', openEditorHandler);
  };

  /**
   * Закрытие формы
   */
  var closeEditor = function () {
    editor.classList.add('hidden');
    editor.removeEventListener('keydown', openEditorHandler);
    uploadForm.reset();
  };

  inputUpload.addEventListener('change', function () {
    openEditor();
  });

  editorClose.addEventListener('click', function () {
    closeEditor();
  });
};

showForm();

/**
 * Отправка формы
 */
var commentField = editor.querySelector('.upload-form-description');

commentField.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

/**
 * Валидация формы
 */
var tagsField = editor.querySelector('.upload-form-hashtags');
var MAX_HASHTAGS = 5;
var MAX_LENGTH_HASHTAG = 20;
var MIN_LENGTH_HASHTAG = 2;

var validateForm = function () {

  var tagsHandler = function (stringOfTags) {
    var errorMessage = '';

    stringOfTags = stringOfTags.trim();
    stringOfTags = stringOfTags.toLowerCase();

    var hashtags = stringOfTags.split('');

    hashtags = hashtags.filter(function (item) {
      return item !== '';
    });

    if (hashtags.length > MAX_HASHTAGS) {
      errorMessage += 'Не больше 5 хэш-тегов.';
    }

    hashtags.forEach(function (item) {
      if (item.length > MAX_LENGTH_HASHTAG) {
        errorMessage += 'Длина хэш-тега не больше 20 символов.';
      }

      if (item[0] !== '#') {
        errorMessage += 'Хэш-тег должен начинаться с символа "#".';
      }

      if (item.length < MIN_LENGTH_HASHTAG) {
        errorMessage +=
          'После символа "#" минимум 1 знак.';
      }

      if (~item.indexOf('#', 1)) {
        errorMessage += 'Хэш-теги отделяются пробелом.';
      }
    });

    var isDuplicate = function (item, i, array) {
      return ~array.indexOf(item, i + 1);
    };

    if (hashtags.some(isDuplicate)) {
      errorMessage += 'Запрещены повторяющие хэш-теги.';
    }

    if (errorMessage) {
      tagsField.setCustomValidity(errorMessage);
    } else {
      tagsField.setCustomValidity('');
      tagsField.style.border = '';
    }
  };

  tagsField.addEventListener('input', function (evt) {
    tagsHandler(evt.target.value);
  });

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

};

validateForm();

var sliderPin = document.querySelector('.upload-effect-level-pin');

sliderPin.addEventListener('mouseup', function () {
});

var imagePreview = document.querySelector('.effect-image-preview');
var effectControl = document.querySelector('.upload-effect-controls');
var chrome = effectControl.querySelector('.upload-effect-label-chrome');
var sepia = effectControl.querySelector('.upload-effect-label-sepia');
var marvin = effectControl.querySelector('.upload-effect-label-marvin');
var phobos = effectControl.querySelector('.upload-effect-label-phobos');
var heat = effectControl.querySelector('.upload-effect-label-heat');
var original = effectControl.querySelector('#upload-effect-none');

/**
 * Переключение фильтров
 */
var implyFilter = function () {

  original.addEventListener('click', function () {
    imagePreview.className = 'upload-effect-label';
  });

  chrome.addEventListener('click', function () {
    imagePreview.className = 'upload-effect-label';
    imagePreview.classList.add('effect-chrome');
  });

  sepia.addEventListener('click', function () {
    imagePreview.className = 'upload-effect-label';
    imagePreview.classList.add('effect-sepia');
  });

  marvin.addEventListener('click', function () {
    imagePreview.className = 'upload-effect-label';
    imagePreview.classList.add('effect-marvin');
  });

  phobos.addEventListener('click', function () {
    imagePreview.className = 'upload-effect-label';
    imagePreview.classList.add('effect-phobos');
  });

  heat.addEventListener('click', function () {
    imagePreview.className = 'upload-effect-label';
    imagePreview.classList.add('effect-heat');
  });

};

implyFilter();

/**
 * Изменение размера
 */
var resizeControls = document.querySelector('.upload-resize-controls');
var decreasePicture = resizeControls.querySelector('.upload-resize-controls-button-dec');
var increasePicture = resizeControls.querySelector('.upload-resize-controls-button-inc');
var resizeValue = resizeControls.querySelector('.upload-resize-controls-value');
resizeValue.value = '100';

var changeSize = function () {
  decreasePicture.addEventListener('click', function () {
    if (resizeValue.value >= 100) {
      resizeValue.value = resizeValue.value - 25;
      imagePreview.style.transform = 'scale(0.75)';
    } else if (resizeValue.value >= 75) {
      resizeValue.value = resizeValue.value - 25;
      imagePreview.style.transform = 'scale(0.5)';
    } else if (resizeValue.value >= 50) {
      resizeValue.value = resizeValue.value - 25;
      imagePreview.style.transform = 'scale(0.25)';
    }
  });

  increasePicture.addEventListener('click', function () {
    if (resizeValue.value <= 25) {
      resizeValue.value = resizeValue.value + 25;
      imagePreview.style.transform = 'scale(0.5)';
    } else if (resizeValue.value <= 50) {
      resizeValue.value = resizeValue.value + 25;
      imagePreview.style.transform = 'scale(0.75)';
    } else if (resizeValue.value <= 75) {
      resizeValue.value = resizeValue.value + 25;
      imagePreview.style.transform = 'scale(1)';
    }
  });

};

changeSize();
