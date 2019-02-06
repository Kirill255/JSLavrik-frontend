import "babel-polyfill";

// import { watchObj, EmailParser } from "./lesson2/hw";
import { EmailParser } from "./lesson2/hw";

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

// let div = document.createElement("div");
// document.body.appendChild(div);

// let cleverDiv = watchObj(div, function(prop, val) {
//   console.log(prop, val);
// });

// cleverDiv.innerHTML = "<strong>HTML</strong><em>Changed</em>";
/*
    в консоли:
    innerHTML <strong>HTML</strong><em>Changed</em
*/

// cleverDiv.style.color = "red";
/*
    весь текст стал красным
    в консоли:
    color red
*/

// cleverDiv.querySelector('em').style.color = 'green';
/*
    em стал зелёным
    в консоли ничего не добавилось

    // популярная ошибка Illegal invocation - из-за манипуляций у функции сломался this
*/
