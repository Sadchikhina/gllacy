var modalWindow = document.querySelector('.modal-window');
var modalClose = modalWindow.querySelector('.close-button');
var modalOpen = document.querySelector('.feedback-button');

modalOpen.addEventListener('click', function () {
  modalWindow.classList.remove('hidden');
});
