import "babel-polyfill";

/* global*/

import { wordsCount, getWords } from "./word.js";

// dz1
let str = "  Всем  привет! Ура ура! ";

window.console.log(wordsCount(str)); // кол-во слов: 4

for (let some of getWords(str)) {
  window.console.log(some); // выводит эти 4 слова
}
