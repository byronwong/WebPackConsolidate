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
`--inline` allows us to to keep watch command.


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


