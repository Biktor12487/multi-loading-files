const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const webpack_rules = [];
const webpackOption = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: webpack_rules
    },
    devServer: {
        stats: 'errors-only',
        historyApiFallback: {
            index: './index.html'
        },
    },
    plugins: [new HtmlWebpackPlugin({
        template: "index.html"
    })]
};
let babelLoader = {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }
};
webpack_rules.push(babelLoader);
module.exports = webpackOption;