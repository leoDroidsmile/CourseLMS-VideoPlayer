const path = require('path');
const moduleConfig = {
    rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env']
                }
            }
        }
    ]
};

const mainProcessConfig = {
    entry: {
        main: './src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: moduleConfig,
    target: 'electron-main',
};

const rendererProcessConfig = {
    entry: {
        renderer: './src/renderer.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: moduleConfig,
    target: 'electron-renderer',
};
module.exports = [mainProcessConfig, rendererProcessConfig];