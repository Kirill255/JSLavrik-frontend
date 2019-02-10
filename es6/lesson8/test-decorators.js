/*
// 1 этап
// допустим у нас есть 2 функции
// function sum(a, b) {
//   return a + b;
// }

// function sub(a, b) {
//   return a - b;
// }

// мы хотим проверить что все параметры это числа, но тогда это дублирование кода, поэтому первоначальная идея декоратора это некая функция-обёртка
// классический паттерн декоратор
function checkNumbers(realFunc) {
  return function(...args) {
    args.forEach((item) => {
      if (typeof item !== "number") {
        throw new Error("type incorect");
      }
    });

    return realFunc.apply(null, args); // или return realFunc.apply(this, args);
  };
}

let sum = checkNumbers(function(a, b) {
  return a + b;
});

let sub = checkNumbers(function(a, b) {
  return a - b;
});

console.log(sum(1, 2));
console.log(sub(1, 2));
//console.log(sum(1, "2"));
*/

/*
// 2 этап
// по шагам покажу как работает функция checkNumbers

// 1 шаг, есть функция
// let sum = checkNumbers(function (a, b) {
//   return a + b;
// });

// 2 шаг, функция checkNumbers возвращает новую функцию
// let sum = function(...args) {
//   args.forEach((item) => {
//     if (typeof item !== "number") {
//       throw new Error("type incorect");
//     }
//   });

//   return realFunc.apply(null, args);
// };

// 3 шаг, realFunc это функция которую мы передаём в checkNumbers
// let sum = function(...args) {
//   args.forEach((item) => {
//     if (typeof item !== "number") {
//       throw new Error("type incorect");
//     }
//   });

//   return (function(a, b) {
//     return a + b;
//   }).apply(null, args);
// };

// 4 шаг, вызов функции sum(1, 2)
// let sum = function(...args) {
//   // args = [1, 2] - спред оператор упаковывает все входящие параметры в массив, этот массив его не нужно явно прописывать, это происходит внутри функции автоматически, просто мы знаем что теперь у нас внутри функции доступна переменная args, в которой лежит массив аргументов
//   args.forEach((item) => {
//     if (typeof item !== "number") {
//       throw new Error("type incorect");
//     }
//   });

//   return (function(a, b) {
//     return a + b;
//   }).apply(null, args);
// };

// 5 шаг
// let sum = function(...args) {
//   // args = [1, 2] - спред оператор упаковывает все входящие параметры в массив, этот массив его не нужно явно прописывать, это происходит внутри функции автоматически, просто мы знаем что теперь у нас внутри функции доступна переменная args, в которой лежит массив аргументов
//   [1, 2].forEach((item) => {
//     if (typeof item !== "number") {
//       throw new Error("type incorect");
//     }
//   });

//   return (function(a, b) {
//     return a + b;
//   }).apply(null, [1, 2]);
// };
*/

// 3 этап
// декораторы сегодня это синтаксический сахар, они транспилируются через babel в классический паттерн декоратор, тоесть в конечном итоге код будет из 1 этапа, но для написания сделан вот такой синтаксис, это как классы и прототипы
// например у нас есть класс, определим у него поле 'a', через Object.defineProperty, и мы например хотим сделать это поле неизменяемым, тоесть только для чтения, для этого есть свойство 'writable: false' (default: true)

// class Some {
//   constructor() {
//     Object.defineProperty(this, "a", {
//       value: "hello",
//       writable: false
//       // configurable: false это чтобы извне тоже нельзя было переопределить путём вызова опять же Object.defineProperty(some, "a" {value: "bye"}), но сейчас оно нам это не нужно
//     });
//   }
// }

// let some = new Some();
// console.log(some.a);
// some.a = 2;
// console.log(some.a);

// написать это можно короче с помощью синтаксиса декораторов, к свойству добавляется модификатор через собачку и имя функции декоратора '@имя_функции'

// class Some {
//   @readonly a = "hello";
// }

// // функция декоратор принимает три параметра, как в Object.defineProperty(this, "a", {})
// function readonly(target, name, descriptor) {
//   // console.log(target); // конструктор объекта/объект (Some)
//   // console.log(name); // свойство (a)
//   // console.log(descriptor); // это объект с настройками из Object.defineProperty
//   descriptor.writable = false; // делаем свойство только для чтения
// }

// let some = new Some();
// console.log(some.a);
// some.a = 2;
// console.log(some.a);

// 4 этап
// более сложный пример работы с декораторами

@nz
class Some {
  @readonly @final power = 2;

  @checkNumbers
  pow(x) {
    return x ** this.power;
  }
}

function readonly(target, name, descriptor) {
  descriptor.writable = false;
}

function final(target, name, descriptor) {
  descriptor.configurable = false;
}

let some = new Some();
console.log(some.power); // 2
some.power = 3;
console.log(some.power); // 2
console.log(some.pow(3)); // 9
console.log(some.pow("3")); // Error: type incorrect

function checkNumbers(target, name, descriptor) {
  // console.log(arguments); // когда мы применяем декоратор к функции, а не свойству, то наша функция также будет передаваться в третий параметр (в descriptor), в поле value
  let realFunc = descriptor.value;

  descriptor.value = function(...args) {
    args.forEach((item) => {
      if (typeof item !== "number") {
        throw new Error("type incorrect");
      }
    });

    return realFunc.apply(this, args);
  };
}

function nz(target) {
  console.dir(target);
}
