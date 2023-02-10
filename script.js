
let popup = document.querySelector('.popup_opened');
let container = document.querySelector('.popup');
let openButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector(".popup__icon");



function vision() {
    console.log('Клик!');
    openButton.addEventListener('click', vision);
    popup.classList.add('popup_opened');
}
vision();


function unvision() {
    console.log('Клик!');
    closeButton.addEventListener('click', unvision);
    popup.classList.remove('popup_opened');
}
unvision();




/*
$(".profile__button-edit").on('click', function() {
    $(".popup").removeClass('popup_opened');
  }); 
  $(".popup__icon").click(function(){
    $(".popup").addClass('popup_opened');
  });


let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

openPopupButtons.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active'); // И для самого окна
    })
});
closePopupButton.addEventListener('click',() => { // Вешаем обработчик на крестик
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна
});


let items = document.querySelector(".items");
let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".modal");
let close = document.getElementById("close");
let button = document.getElementById("button");

function vision() {
  items.classList.add("view");
  overlay.classList.add("active");
  modal.classList.add("active");
}
function unvision() {
  items.classList.remove("view");
  overlay.classList.remove("active");
  modal.classList.remove("active");
}
button.addEventListener("click", vision);
close.addEventListener("click", unvision);


добавьте к окну стиль display none,
 нажимая на странице на кнопку удаляйте стиль, 
 при нажатии на крестик добавляйте обратно. 
 Так делается модальное окно.
*/