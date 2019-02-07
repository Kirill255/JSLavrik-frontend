/* global HTMLElement Proxy */
export class Parody {
  constructor(props) {
    if (typeof props !== "object") {
      props = {};
    }

    this.props = props;
    this.isMount = false;
    this.targetNode;
  }

  initState(obj) {
    this.state = watchObj(obj, this.render.bind(this));
  }

  setState(newState) {
    Object.assign(this.state, newState);
    this.render();
  }

  bindMount(selector) {
    this.isMount = true;
    this.targetNode = document.querySelector(selector);
    return this;
  }

  render(node) {
    if (this.isMount) {
      this.targetNode.innerHTML = "";
      this.targetNode.appendChild(node);
    }

    return node;
  }
}

export function ParodyDom(tag, props, ...children) {
  if (typeof tag === "function") {
    return new tag(props).render();
  }

  let node = document.createElement(tag);

  function addChildren(child) {
    if (child instanceof HTMLElement) {
      node.appendChild(child);
    } else if (typeof child === "object") {
      for (let elem of child) {
        addChildren(elem);
      }
    } else {
      let textNode = document.createTextNode(child);
      node.appendChild(textNode);
    }
  }

  children.forEach(addChildren);

  Object.assign(node, props);

  return node;
}

function watchObj(node, callback) {
  let reactiveFunctions = {
    push: true,
    pop: true,
    splice: true,
    slice: true,
    shift: true,
    unshift: true,
    sort: true
  };

  return new Proxy(node, {
    get(target, name) {
      if (typeof target[name] === "function") {
        if (name in reactiveFunctions) {
          return function(...args) {
            let res = target[name].apply(target, args);
            callback();
            return res;
          };
        } else {
          return target[name].bind(target);
        }
      }

      return watchObj(target[name], callback);
    },
    set(target, name, value) {
      target[name] = value;
      callback(name, value);
      return true;
    }
  });
}
