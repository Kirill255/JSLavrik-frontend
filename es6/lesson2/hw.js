/* global Proxy */

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

function watchObj(node, callback) {
  return new Proxy(node, {
    // cleverDiv.innerHTML = "<strong>HTML</strong><em>Changed</em>"; чтобы работала эта строка нужно сделать сеттер
    set(target, name, value) {
      target[name] = value;
      callback(name, value); // это вывод в консоль function(prop, val) { console.log(prop, val);}
      return true;
    },
    // cleverDiv.style.color = "red";
    // get(target, name) {
    //   return watchObj(target[name], callback);
    // },

    // console.log(cleverDiv.innerHTML);
    // get(target, name) {
    //   switch (typeof target[name]) {
    //     case "object":
    //       return watchObj(target[name], callback);
    //     default:
    //       return target[name];
    //   }
    // },

    // cleverDiv.querySelector("em").style.color = "green";
    get(target, name) {
      switch (typeof target[name]) {
        // если поле объект, то рекурсивно парсим дальше cleverDiv.style.color
        case "object":
          return watchObj(target[name], callback);
        // если поле функция, то нам нужно привязать контекст cleverDiv.querySelector()
        case "function":
          return target[name].bind(target);
        // если поле просто поле, то возвращаем значение поля cleverDiv.innerHTML
        default:
          return target[name];
      }
    }
  });
}

export { watchObj, EmailParser };
