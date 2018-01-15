var path = require('path');

module.exports = {
    context: path.resolve('js'),
    entry: ['./util.js','./app.js'],
    output: {
        path: path.resolve('build/js/'),
        publicPath: '/public/assets/js/',
        filename: './bundle.js'
    },
    watch: true,

    plugins: [],

    devServer: {
        contentBase: 'public'
    },

    module: {
        rules: [
            { 
                enforce: 'pre',
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "jshint-loader"
            },
            { 
                test: /\.es6$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.es6']
    }
};