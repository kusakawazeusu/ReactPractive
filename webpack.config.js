const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/app/index.html`,
  filename: 'index.html',
  inject: 'body',
});

//require('./app/css/uikit.min.css');

module.exports = {
    entry: [
        './app/index.jsx',
        './app/markdown.jsx',
        './app/todo.jsx',
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    devServer: {
        inline: true,
        port: 5000
    },
    // plugins 放置所使用的外掛
    plugins: [HTMLWebpackPluginConfig],
}