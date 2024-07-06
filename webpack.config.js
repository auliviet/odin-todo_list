const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { library } = require('webpack');

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "var",
        library: "myLib"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
};