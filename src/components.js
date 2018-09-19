export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const type = 'demo-product';

  domc.addType(type, {
    model: defaultModel.extend({
      init() {
        // if (!document.querySelector(`script[src="${config.pathToWidget}"]`)) {
        //   // load
        //   const script = document.createElement('script');
        //   script.type = 'text/javascript';
        //   script.src = config.pathToWidget;
        //   document.getElementsByTagName('head')[0].appendChild(script);
        // }
        // editor.addComponents(
        //   `<script src="${config.pathToWidget}"></script>`
        // );
        this.listenTo(this, 'change:data-product', this.reload);
      },

      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': config.label,
        type,
        // draggable: false,
        // droppable: false,
        // copyable: false,
        // removable: false,
        traits: [
          {
            type: 'text',
            label: 'SKU',
            name: 'data-product',
            placeholder: config.defaultProductId,
            changeProp: 1,
          }
        ]
      },

      toHTML(opts) {
        const container = document.createElement('div');
        const element = document.createElement('div');
        const widget = this.view.el.getAttribute('data-widget');
        const product = this.view.el.getAttribute('data-product');
        element.setAttribute('data-widget', widget);
        element.setAttribute('data-product', product);
        element.setAttribute('data-script', config.pathToWidget);
        container.appendChild(element);
        return container.innerHTML;
      },

      reload({ view: { el }, changed }) {
        const newId = changed['data-product'] || config.defaultProductId;
        el.setAttribute('data-product', newId);
      },
    }, {
        isComponent(el) {
          if (el.getAttribute &&
            el.getAttribute('data-gjs-type') == type) {
            return { type };
          }
        },
      }),
    view: defaultView,
  });
}
