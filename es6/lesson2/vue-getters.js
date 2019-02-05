export default class VueGetters {
  constructor(settings) {
    this.$el = document.querySelector(settings.el);
    this.$template = settings.template;
    this.$data = settings.data;
    this.data = {};

    for (let name in this.$data) {
      Object.defineProperty(this.data, name, {
        get: () => {
          return this.$data[name];
        },
        set: (value) => {
          this.$data[name] = value;
          this.render();
        }
      });
    }

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

    // /{{(.*?)}}/g
    // в match попадёт всё выражение из шаблона включая фигурные скобки '{{ clicks }}'
    // в name попадёт то что взято в круглые скобки (.*?) тоесть просто само значение внутри  фигурных скобок 'clicks'
    // круглые скобки () указывает на то, что часть шаблона должна быть запомнена (захват)
    let html = this.$template.replace(/{{(.*?)}}/g, (match, name) => {
      let key = name.trim();
      return this.$data[key];
    });

    this.$el.innerHTML = html;
  }
}
