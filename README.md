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

    // dev server root folder to serve files from
    devServer: {
        contentBase: 'public'
    },
```

## Working with ES6 modules
Here if we are working in ES6, we will need webpack to read the includes.

Step 1:
Replace the common JS modules with ES6
```js 
    var dep = require('dep');
    // with 
    import {} from './dep';
```

Step 2: 
Rename files from `.js` to `.es6`

Step 3:
```js
    // in webpack config
    // remove the .js extension
    entry: ['./util','./app'],

    // also ensure your resolve is setup with .es6
    resolve: {
        extensions: ['.js', '.es6']
    }
```

## Adding sourcemaps
This is already built into webpack
```js
    // commands
    webpack -d // source maps
    webpack-dev-server -d -p // add source maps and minify the code
```

## Create multiple bundles
This is useful for lazy loading. For instance if you have three different pages using three different js files. NOTE: webpack comes with basic util code which we don't want to repeat, so first we will have to extract that code out to be included on all pages.

Step 1:
Extract share webpack js code.
```js

    // In the webpack config:

    var webpack require('webpack'); // will need to require it to get the code.
    
    // saves the shared js as shared.js
    // this creates a plugin 
    var commonPlugin = new webpack.optimize.CommonsChunkPlugin('shared.js'); 

    // 1: next we add the plugin in the config exports object
    // 2: change entry to an object to specific js 
    // 3: change filename in output to be a placeholder, name will come from the entry keys e.g. about or home.
    // 4: change the html script tag to load the common js and page1.js
    entry: {
        about: './page1.js',
        home: './page2.js'
        },
    output: {
        path: path.resolve('build/js/'),
        publicPath: '/public/assets/js/',
        filename: './[name].js'
    },
    plugins: [commonPlugin], 


```



