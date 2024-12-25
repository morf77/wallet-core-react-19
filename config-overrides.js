// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// module.exports = function override(config) {
//   config.plugins = (config.plugins || []).concat([
//     new NodePolyfillPlugin({
//       excludeAliases: ['console'],
//     }),
//   ]);

//   return config;
// };


console.log("############Webpack override is being applied");



const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


// console.log(require(path.resolve(__dirname, "./src/fs-config.ts")))


module.exports = function override(config) {
  // Add NodePolyfillPlugin to handle polyfills
  config.plugins = (config.plugins || []).concat([
    new NodePolyfillPlugin({
      excludeAliases: ['console'], // Exclude console alias
    }),
    // Add BrowserFS with webpack.ProvidePlugin
    new webpack.ProvidePlugin({
      BrowserFS: 'browserfs',
    }), 
  ]);


  (async()=>console.log("*****test in config file",require(path.resolve(__dirname, "./src/fs-config.js"))))()

  // Merge resolve.alias for BrowserFS shims
  config.resolve = {
    ...config.resolve,
    extensions: ['.js', '.ts', '.json','.tsx'],
    alias: {
      ...(config.resolve ? config.resolve.alias : {}),
      // fs: "browserfs/dist/shims/fs.js",
      "fs/promises": "browserfs/dist/shims/buffer.js",
      buffer: 'browserfs/dist/shims/buffer.js',
      path: 'browserfs/dist/shims/path.js',
      processGlobal: 'browserfs/dist/shims/process.js',
      util: "util"
    },
  };

  return config;
};