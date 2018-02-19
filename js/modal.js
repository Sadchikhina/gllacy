var modalWindow = document.querySelector('.modal-window');
var modalClose = modalWindow.querySelector('.close-button');
var modalOpen = document.querySelector('.feedback-button');
var ESC_KEYCODE = 27

modalOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalWindow.classList.add('modal-show');
});

modalClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalWindow.classList.remove('modal-show');
});

document.addEventListener('keydown', function (evt) {
if (evt.keyCode === ESC_KEYCODE) {
        modalWindow.classList.remove('modal-show');
  }
});
