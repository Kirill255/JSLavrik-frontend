import "babel-polyfill";

import { watchObj, EmailParser } from "./lesson2/hw";

// part 1

let parser = new EmailParser("info@ntschool.ru");
console.log(parser.email);
console.log(parser.name);
console.log(parser.domain);
console.log(parser.isCorrect);

parser.email = "some@nz";
console.log(parser.email);
console.log(parser.name);
console.log(parser.domain);
console.log(parser.isCorrect);

parser.email = "some@nz.com";
console.log(parser.email);
console.log(parser.name);
console.log(parser.domain);
console.log(parser.isCorrect);

// part 2

let div = document.createElement("div");
document.body.appendChild(div);

let cleverDiv = watchObj(div, function(prop, val) {
  // функция прослушки, тоесть выводим в консоль, когда что-то происходит с полями объекта
  console.log(prop, val);
});

// это будет setter
cleverDiv.innerHTML = "<strong>HTML</strong><em>Changed</em>";
/*
    в консоли:
    innerHTML <strong>HTML</strong><em>Changed</em
*/

// это уже getter будет
console.log(cleverDiv.innerHTML);

// это сначала getter, а после ещё и setter, тоесть нам нужно сначала получить поле 'style" cleverDiv.style, а после установить значение для поля 'color' в этом объекте cleverDiv.style.color = "red", собственно на этом моменте срабатывает рекурсия
cleverDiv.style.color = "red";
/*
    весь текст стал красным
    в консоли:
    color red
*/

// это сначала getter, но тут идёт обращение не к просто полю, тоесть тут поле является функцией querySelector("em"), потом мы для результата функции получаем getter для поля 'style', затем setter устанавливает 'color'
cleverDiv.querySelector("em").style.color = "green";
/*
    em стал зелёным
    в консоли ничего не добавилось

    // популярная ошибка Illegal invocation - из-за манипуляций у функции сломался this
*/

// а тут сначала getter, а потом getter с полем функцией
cleverDiv.classList.add("some");
