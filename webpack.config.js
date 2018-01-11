module.exports = {
    entry: ['./src/js/util.js','./src/js/app.js'],
    output: {
        filename: './dist/js/bundle.js'
    },
    watch: true,

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