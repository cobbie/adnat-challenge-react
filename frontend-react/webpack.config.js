const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            // use: {
            //     loader: 'babel-loader'
            // }, 
            loader: 'babel-loader',
            options: {
                presets: ['env', 'react', 'es2015'],
                plugins: ['transform-class-properties']
            }
        }, {
            test: /\.css$/i,
        use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}