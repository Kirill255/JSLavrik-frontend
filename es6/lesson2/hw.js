/* global Proxy */
function watchObj(node, callback) {
  /* return new Proxy(node, {...}) */
  return node;
}

class EmailParser {
  constructor(email) {
    this.email = email;
  }
}

export { watchObj, EmailParser };
