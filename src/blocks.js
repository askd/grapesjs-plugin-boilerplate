export default (editor, config = {}) => {
  const bm = editor.BlockManager;
  bm.add('h-demo-product', {
    label: config.label,
    category: 'Shop',
    attributes: {
      class: 'gjs-fonts gjs-f-b1',
    },
    content: {
      script: function () {
        // console.log(this);
        // this.addEventListener('click', function (e) {
        //   console.log('clicked');
        // })
        const widgetNode = this.querySelector('[data-widget]');
        if (!widgetNode) return;
        const src = widgetNode.getAttribute('data-script');
        widgetNode.removeAttribute('data-script');
        if (!document.querySelector(`script[src="${src}"]`)) {
          // load
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = src;
          document.body.appendChild(script);
        }
      },
      components: `
        <div data-gjs-type="demo-product" data-script="${config.pathToWidget}" data-widget="${config.appNodeId}" data-product="${config.defaultProductId}">

        </div>
      `
    }
  });
}
