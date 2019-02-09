/* global FormData */
import server from "./server";

export async function login(login, password) {
  let data = new FormData();
  data.append("login", login);
  data.append("password", password);

  let response = await server.post("auth.php", data);
  return response.data;
}
