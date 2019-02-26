const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: "inline-source-map",
    entry: {
        background:'./src/background.ts',
        content_script:'./src/content_script.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /fest\.json$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: __dirname + '/src/assets',
            to: __dirname + '/dist/assets'
        }, {
            from: __dirname + '/src/manifest.json',
            to: __dirname + '/dist/manifest.json'
        }]),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            title: '我爱学习',
            bodyHtmlSnippet: '<img id="img" src="assets/icon.jpg">',
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};