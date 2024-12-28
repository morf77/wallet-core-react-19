// // const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// // module.exports = function override(config) {
// //   config.plugins = (config.plugins || []).concat([
// //     new NodePolyfillPlugin({
// //       excludeAliases: ['console'],
// //     }),
// //   ]);

// //   return config;
// // };


// console.log("############Webpack override is being applied");



// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// const path = require('path');
// const webpack = require('webpack');


// // console.log(require(path.resolve(__dirname, "./src/fs-config.ts")))


// module.exports = function override(config) {
//   // Add NodePolyfillPlugin to handle polyfills
//   config.plugins = (config.plugins || []).concat([
//     new NodePolyfillPlugin({
//       excludeAliases: ['console'], // Exclude console alias
//     }),
//     // Add BrowserFS with webpack.ProvidePlugin
//     new webpack.ProvidePlugin({
//       BrowserFS: 'browserfs',
//     }), 
//   ]);


//   (async()=>console.log("*****test in config file",require(path.resolve(__dirname, "./custom_modules/fs/promises.js"))))()

//   // const HtmlWebpackPlugin = require('html-webpack-plugin');


//   // const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');



//   // Merge resolve.alias for BrowserFS shims
//   config.resolve = {
//     ...config.resolve,
//     extensions: ['.js', '.ts', '.json','.tsx'],
//     modules: [
//       'node_modules',
//       path.resolve('./node_modules'),
//       'src',
//       path.resolve(__dirname, './src'),  // Add this line to include `src` in the module resolution,
//       // 'custom_modules',
//       // path.resolve(__dirname, './custom_modules')
//     ],
//     alias: {
//       ...(config.resolve ? config.resolve.alias : {}),
//       fs: "browserfs/dist/shims/fs.js",
//       src: path.resolve(__dirname, './src'),
//       // "fs/promises" : path.resolve(__dirname, "./custom_modules/fs/promises.js"),
//       // "fs/promises" : path.resolve(__dirname, "./custom_modules/fs/promises.js"),
//       "fs/promises": "./src/fs-config.js",
//       buffer: 'browserfs/dist/shims/buffer.js',
//       path: 'browserfs/dist/shims/path.js',
//       processGlobal: 'browserfs/dist/shims/process.js',
//       util: "util"
//     },
//     plugins:[
//       ...config.resolve.plugins,
      
//       // new HtmlWebpackPlugin({
//       //   template: './src/index.html', 
//       // }),
//       // new BundleAnalyzerPlugin({
//       //   analyzerMode: 'static', 
//       // }),      
//     ]
//   };

//   console.log("Webpack config resolve:", config.resolve);


//   return config;
// };



const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = function override(config) {
  console.log('############Webpack override is being applied',require(path.resolve(__dirname, 'node_modules/fs/promises/index.js')));

  // Add plugins
  config.plugins = (config.plugins || []).concat([
    new NodePolyfillPlugin({
      excludeAliases: ['console'],
    }),
    new webpack.ProvidePlugin({
      BrowserFS: 'browserfs',
    }),
  ]);

  // Configure resolve
  config.resolve = {
    ...config.resolve,
    extensions: ['.js', '.ts', '.json', '.tsx'],
    // modules: [
    //   'node_modules',
    //   path.resolve(__dirname, './src'),
    // ],
    alias: {
      ...(config.resolve ? config.resolve.alias : {}),
      'fs/promises': path.resolve(__dirname, './src/fs-config.js'),
      fs: 'browserfs/dist/shims/fs.js',
      // 'fs/promises': 'browserfs/dist/shims/fs.js',
      // src: path.resolve(__dirname, './src'),
      // fs: path.resolve(__dirname, './src/fs/fs-config.js'),
      // 'fs/promises': path.resolve(__dirname, 'node_modules/fs/promises/index.js'),
      buffer: 'browserfs/dist/shims/buffer.js',
      path: 'browserfs/dist/shims/path.js',
      processGlobal: 'browserfs/dist/shims/process.js',
      util: 'util',
    },
  };

  console.log('Webpack config resolve:', config.resolve);

  return config;
};