import loadComponents from './components';
import loadBlocks from './blocks';

// export default (editor, opts = {}) => {
//   const options = { ...{
//     // default options
//   },  ...opts };

//   // Add components
//   loadComponents(editor, options);

//   // Add blocks
//   loadBlocks(editor, options);

//   // TODO Remove
//   editor.on(
//     'load',
//     () => editor.addComponents(
//       `<div style="margin:100px; padding:25px;">Content loaded from the plugin</div>`,
//       { at: 0 }
//     )
//   )
// };

export default grapesjs.plugins.add('gjs-demo-product', (editor, config = {}) => {
  const defaults = {
    blocks: ['h-demo-product'],
    defaultStyle: 1,
    label: 'Product',
    appNodeId: 'demo-product',
    pathToWidget: 'http://localhost:8080/widgets/demoProduct.js',
    defaultProductId: '100683',
  };

  // Load defaults
  for (let name in defaults) {
    if (!(name in config))
      config[name] = defaults[name];
  }

  loadBlocks(editor, config);
  loadComponents(editor, config);
});
