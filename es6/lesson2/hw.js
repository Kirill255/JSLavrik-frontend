// /* global Proxy */

// способ с Object.defineProperty

// class EmailParser {
//   constructor(email) {
//     this.email = email;

//     Object.defineProperty(this, "isCorrect", {
//       get() {
//         let patt = /.+@.+\.[ru|com]/;
//         return patt.test(this.email);
//       }
//     });

//     Object.defineProperty(this, "name", {
//       get() {
//         return this.isCorrect ? this.email.split("@")[0] : null;
//       }
//     });

//     Object.defineProperty(this, "domain", {
//       get() {
//         return this.isCorrect ? this.email.split("@")[1] : null;
//       }
//     });
//   }
// }

// способ с Object.defineProperty и приватными полями
// определёно приватное хранилище и доступ к его полям только через геттеры/сеттеры

// class EmailParser {
//   constructor(email) {
//     this._data = { email: email }; // "email": email просто редактор убирает кавычки

//     Object.defineProperty(this, "email", {
//       get: () => {
//         return this._data["email"];
//       },
//       set: (newEmail) => {
//         this._data["email"] = newEmail;
//       }
//     });

//     // тут уже можно впринципе обращаться к полю email через наш геттер, тоесть просто this.email
//     // а уже геттер вернёт приватное поле this._data["email"], хотя можно написать и так
//     // Object.defineProperty(this, "isCorrect", {
//     //   get: () => {
//     //     let patt = /.+@.+\.[ru|com]/;
//     //     return patt.test(this._data["email"]); // дёргаем само поле
//     //   }
//     // });

//     Object.defineProperty(this, "isCorrect", {
//       get() {
//         let patt = /.+@.+\.[ru|com]/;
//         return patt.test(this.email); // дёргаем геттер
//       }
//     });

//     Object.defineProperty(this, "name", {
//       get() {
//         return this.isCorrect ? this.email.split("@")[0] : null;
//       }
//     });

//     Object.defineProperty(this, "domain", {
//       get() {
//         return this.isCorrect ? this.email.split("@")[1] : null;
//       }
//     });
//   }
// }

// в классах доступен более краткий синтаксис для установки геттеров и сеттеров
// также я сделал поле email приватным(какбы), и для обращения к нему тоже сделал геттер/сеттер

class EmailParser {
  constructor(email) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  set email(newEmail) {
    this._email = newEmail;
  }

  get isCorrect() {
    let patt = /.+@.+\.[ru|com]/g;
    return patt.test(this._email);
  }

  get name() {
    return this.isCorrect ? this._email.split("@")[0] : null;
  }

  get domain() {
    return this.isCorrect ? this._email.split("@")[1] : null;
  }
}

// function watchObj(node, callback) {
//   /* return new Proxy(node, {...}) */
//   return node;
// }

// export { watchObj, EmailParser };
export { EmailParser };
