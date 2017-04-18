var path = require('path');

module.exports = {
    //define entry point
    entry: path.resolve(__dirname, 'src') + '/index.js',
    //define output point
    output: {
        path: path.resolve(__dirname, 'assets')+'/js',
        filename: 'bundle.js'
    },
     module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.sass$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ] //loaders
    } //module
};
