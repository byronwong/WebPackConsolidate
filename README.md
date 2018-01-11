# Webpack Summary

## Getting started
Exercise files can be found [here](https://github.com/joeeames/WebpackFundamentalsCourse)

### Basic usage with webpack
Here we will take a file and get webpack to create an out file.
```js
    webpack <input file path> <output file path>
    webpack ./src/js/entry.js ./src/js/bundle.js
```

### Adding a config file
We can add a config file to the build, this saves us entering the parameters all the time, so we can run webpack with just the command `webpack`.
```js
    module.exports = {
        entry: './src/js/app.js',
        output: {
            filename: './dist/js/bundle.js'
        }
    };
```

### Adding watch mode
We can use the command `webpack --watch` or we can add it to the config file.
```js
    module.exports = {
        entry: './src/js/app.js',
        output: {
            filename: './dist/js/bundle.js'
        },
        watch: true
    };
```

## Using webpack dev server
Once installed we can run the command `webpack-dev-server --inline`
`--inline` allows us to to keep watch command running on the dev server.


## Building with multiple files
We can include multiple files in using the `require`. 
```js
    // for instance the app.js file
    console.log('hello world');

    require('./file01');
    require('./file02');

    // webpack would now include the other files in the build.
```

We can also include files into the bundle without the use of `require`.
```js
    // instead we can edit our config file.
    // make entry an array.
    module.exports = {
    entry: ['./src/js/util.js','./src/js/app.js'],
    output: {
        filename: './dist/js/bundle.js'
    },
    watch: true
};
```

## Loaders
Out of the box webpack is good at taking our js and compiling it, and that is about it. We can add more functionality by using loaders.

In this demo we will add linting and ES6 support via babel.

### Adding Babel (loaders)
You can get the updated guide [https://babeljs.io/docs/setup/#installation](https://babeljs.io/docs/setup/#installation)

- Install babel as per instructions
- add `.babelrc` file and include preset
- add a module section the webpack config
```js 
    module: {
        loaders: [
            { 
                test: /\.es6$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            }
        ]
    },

    // we have also added a resolve section, this tells webpack which extensions we accept.
    // by default webpack accepts '.js' thus when we require we do not need to include the file ext. 
    resolve: {
        extensions: ['.js', '.es6']
    }
``` 

### Adding eslint (pre-loaders)
Following the instructional video in webpack V3 `pre-loaders` and `post-loaders` are no longer in the spec. loaders is now rules and you use the `enforce` property to define `pre` and `post`.
```js
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
```

## Development vs Production
When we go to production there are a few things we want done. We can run the development script using `webpack -p` - this will minify the code.

Here we want to extent the existing config file, to do this we require the original config file.
`webpack --config webpack-production.config.js -p`
```js
    var webPackStripLoader = require('strip-loader');
    var devConfig = require('./webpack-config');

    var stripLoader = { 
        test: [/\.es6$/, /\.js$/ ],
        exclude: /node_modules/, 
        loader: webPackStripLoader.loader('console.log', 'perfLog')
    };

    devConfig.module.rules.push(stripLoader); // added the object to the existing rules array in config

    module.exports = devConfig;
```

## Organising files and folders
```js
    context: path.resolve('js'), // set the relative root for our js files
    entry: ['./util.js','./app.js'], // with the relative path now setup the paths are ./js/util.js
    output: {
        path: path.resolve('build/js/'), // tells webpack where to put the bundle.js file
        publicPath: '/public/assets/js/', // tells the server where the bundle.js file will be served.
        filename: './bundle.js'
    },
    watch: true, 

    // dev server root folder
    devServer: {
        contentBase: 'public'
    },
```