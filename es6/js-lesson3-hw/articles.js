import * as serverApi from "./db";

async function all() {
  let response = await serverApi.all();
  return parseResponse(response);
}

async function one(id) {
  let response = await serverApi.get(id);
  return parseResponse(response);
}

async function remove(id) {
  let response = await serverApi.remove(id);
  return parseResponse(response);
}

export { all, one, remove };

// сделаем функцию чтобы избежать дублирования кода
function parseResponse(text) {
  try {
    let responce = JSON.parse(text);

    if (responce.code !== 200) {
      throw new Error("Код ответа не 200!");
    }

    return responce.data;
  } catch (e) {
    throw new Error("Некорректный формат ответа от севера!");
  }
}
