import "babel-polyfill";

/*
import some from './lesson2/getters';

console.log(some.cnt); // some._private.cnt
some.cnt = 5; // some.cnt.setter(5) ...
console.log(some.cnt);
some.cnt = -10;
console.log(some.cnt);
some.cnt = 100;
console.log(some.cnt);

import data from './lesson2/proxy';
console.log(data.a);
data.a = 5;
console.log(data.a);
data.b = 7;
console.log(data.b);


import VueGetters from './lesson2/vue-getters';
import VueProxy from './lesson2/vue-proxy';

let vg = new VueGetters({
    el: '.elem1',
    data: {
        clicks: 1,
        name: 'Some!'
    },
    template: `<div><h2>{{ clicks }}</h2>{{ name }}</div>`
});

document.querySelector('.elem1').addEventListener('click', function(){
    vg.data.clicks++;
});


let vp = new VueProxy({
    el: '.elem2',
    data: {
        clicks: 1,
        name: 'Some!'
    },
    template: `<div><h2>{{ clicks }}</h2>{{ name }}</div>`
});

document.querySelector('.elem2').addEventListener('click', function(){
    vp.data.clicks++;
}); */

import { watchObj, EmailParser } from "./lesson2/hw";

let parser = new EmailParser("info@ntschool.ru");
console.log(parser.name);
console.log(parser.domain);
console.log(parser.isCorrect);

parser.email = "some@nz";
console.log(parser.name);
console.log(parser.domain);
console.log(parser.isCorrect);

let div = document.createElement("div");
document.body.appendChild(div);

let cleverDiv = watchObj(div, function(prop, val) {
  console.log(prop, val);
});

cleverDiv.innerHTML = "<strong>HTML</strong><em>Changed</em>";
/*
    в консоли:
    innerHTML <strong>HTML</strong><em>Changed</em
*/

cleverDiv.style.color = "red";
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

/*
import Timer from './lesson2/timer';

let some = {
    i: 2
};

function double(n, m){
    return this.i * this.i * n * m;
}

let doubleF = (n, m) => {

}

let doubleFF = (function(n, m){

}).bind(this);

(function(){
    let _that = this;

    let doubleFFF = function(n, m){
        // this -> _that
    };
})();

// console.log(double(3));

console.log(double.call(some, 3, 2));
console.log(double.apply(some, [3, 2]));

let double2 = double.bind(some);
console.log(double2);
console.log(double2(3, 2));
console.log(double2.call(null, 2, 3));

// double(3, 2) - this -> some

// function.bind(context) -> new_function context = const

let timer = new Timer(document.querySelector('.timer1'), 100);

let double3 = double.bind(some, 3);
console.log(double3(1, 1));

for(var i = 0; i < 5; i++){
    window.setTimeout((function(i){
        console.log(i);
    }).bind(null, i), i * 200);
}
*/
