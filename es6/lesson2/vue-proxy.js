/* global Proxy */
export default class VueGetters {
  constructor(settings) {
    this.$el = document.querySelector(settings.el);
    this.$template = settings.template;
    this.$data = settings.data;

    this.data = new Proxy(this.$data, {
      get: (target, name) => {
        return target[name];
      },
      set: (target, name, value) => {
        target[name] = value;
        this.render();
        return true;
      }
    });

    this.render();
  }

  render() {
    /*
            + виртуальная DOM
            + обширные возможности в шаблонах
        */

    /*
            {
                tag: 'div',
                listeners: [],
                classes: [],
                children: [
                    {
                        tag: 'h2',
                        innerText: '{{clicks}}'
                    },
                    {
                        tag: 'div',
                        innerText: '{{some}}'
                    }
                ]
            }

        */

    let html = this.$template.replace(/{{(.*?)}}/g, (match, name) => {
      let key = name.trim();
      return this.$data[key];
    });

    this.$el.innerHTML = html;
  }
}
