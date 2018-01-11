var webPackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config');

var stripLoader = { 
    test: [/\.es6$/, /\.js$/ ],
    exclude: /node_modules/, 
    loader: webPackStripLoader.loader('console.log')
};

devConfig.module.rules.push(stripLoader);

module.exports = devConfig;