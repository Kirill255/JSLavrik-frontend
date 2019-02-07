# frontend

## Schedule

1. Урок 1
   - Этапы готовности новшеств stage [0, 4]
   - Настройка Webpack + Babel
   - Настройка VS Code + eslint
   - Export и import vs require
   - Итераторы и генераторы, Symbol
   - Полифилы для новых классов
2. Урок 2
   - Call, apply, bind, карринг
   - Стрелочные функции
   - Синтаксис классов в ES6 и ES7
   - Идеи реактивности данных
   - Обычные геттеры и сеттеры
   - Proxy - перехват обращения к объекту
3. Урок 3
   - Обработка ошибок и исключений
   - Ужас цепочек из коллбеков
   - Проблема коллбеков и исключений
   - Promise: then, catch
   - Промисификация кода
   - Новые фишки: async, await
4. Урок 4
   - Декораторы классов
   - Настройка babel для декораторов
   - Декораторы в react + mobx
   - Идеи компонентного подхода
   - Поток данных и генерация событий
   - Небольшая пародия на javascript фреймворк
5. Урок 5
   - Взаимодействие с сервером
   - XMLHttpRequest vs fetch
   - fetch + полифил vs axios
   - Работа с fetch
   - Передача данных в json-формате
   - Идеи REST API
6. Урок 6
   - Работа с axios
   - Базовая настройка
   - Отправка запросов и обработка ответов
   - Интерцепторы
   - Работа с токенами авторизации
   - Взаимодействие с готовым REST API
7. Урок 7
   - Применение изученных тем в React
   - Настройка стартового шаблона
   - Основы React и JSX
   - Состояния компонентов
   - Взаимодействие между компонентами
8. Урок 8
   - Проблемы реактивности
   - Проблемы взаимодействия компонентов
   - React + Mobx
   - Создание небольшого приложения
   - Подведение итогов

Upd: Декораторы классов из 4 урока вынесены в 5 урок, в 4 уроке рассмотрены только идеи компонентного подхода, поток данных/генерация событий, и написана пародия на фреймворк.

### Установка webpack и babel

1. `npm i -D webpack webpack-cli webpack-dev-server`

2. Создать `webpack.config.js`

```js
let path = require("path");

let conf = {
  entry: "./es6/scripts.js", // точка входа, взять этот файл
  output: {
    path: path.resolve(__dirname, "./js"), // положить сюда итоговый файл
    filename: "main.js", // имя итогового файла, придумываем сами, преобразовать в этот файл
    publicPath: "js/" // это относительная ссылка из тега script, которая ссылается из index.html на наш итоговый файл, тоесть в index.html подключаяется наш итоговый js файл по пути /js/main.js, вот так `<script src="js/main.js"></script>`
  },
  devServer: {
    overlay: true // https://webpack.js.org/configuration/dev-server/#devserver-overlay
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
        // exclude: '/node_modules/'
      }
    ]
  }
};

module.exports = conf;
```

3. `npm install -D babel-loader @babel/core @babel/preset-env`

4. Создать `.babelrc`

```json
{
  "presets": ["@babel/preset-env"]
}
```

#### plugins

1. Ставим babel плагин `npm install -D @babel/plugin-proposal-class-properties`

2. Добавляем настройки в `.babelrc`

```json
{
  // ...
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

3. Добавляем sourcemap https://webpack.js.org/configuration/devtool/, нужно изменить в `webpack.config.js` module.exports на реализацию ввиде функции, тут мы добавляем настройку devtool в конфиг, но не статично как обычно, а изменяем конфиг на лету с учётом options, т.к. мы хотим в зависимости от режима(dev/prod) добавлять разные sourcemap, в options есть ключ mode, где хранится инфа о режиме dev/prod, если prod => то не делать sourcemap, если dev => то сделать sourcemap вида 'cheap-module-eval-source-map', кстате в prod обычно ставят 'source-map' вид, но мы не будем.

```js
// module.exports = conf;

module.exports = (env, options) => {
  // console.log(options.mode)
  conf.devtool = options.mode === "production" ? false : "cheap-module-eval-source-map";

  return conf; // обязательно вернуть конфиг, мы же его экспортируем из файла
};
```

4. Ставим babel плагин для работы с jsx `npm i -D @babel/plugin-transform-react-jsx`

```json
{
  // ...
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-transform-react-jsx", { "pragma": "ParodyDom" }]
  ]
}
```

Ключ `pragma` по-умолчанию равен `"pragma": "React.createElement"`, но у нас нет сдесь реакта, мы хотим просто использовать сам `jsx`, но этот ключ можно изменить на любое! другое название, которое будет использоваться для создания элементов, тоесть в реакте это выглядит следующим образом:

```js
React.createElement("div", { className: "" }); // и т.д.
```

а у нас это теперь будет выглядеть так:

```js
ParodyDom("div", { className: "" }); // и т.д.
```

#### babel-polyfill

https://babeljs.io/docs/en/babel-polyfill - тут новая версия

https://www.npmjs.com/package/babel-polyfill - тут старая (но вроде активно используется)

1. `npm i -S babel-polyfill`. Сейчас уже вроде поменялась версия `npm i -S @babel/polyfill`

2. Чтобы включить полифилл, вам необходимо указать его в верхней части точки входа в ваше приложение. У нас точка входа это файл './es6/scripts.js' `import "babel-polyfill";` или `import "@babel/polyfill";`

### Ставим eslint

1. `npm i -D eslint babel-eslint`

2. Создать `.eslintrc`

```json
{
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "globals": {
    "window": true,
    "document": true,
    "console": true
  },
  "rules": {
    "no-console": "off"
  }
}
```
