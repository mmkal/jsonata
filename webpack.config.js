const path = require('path');
const webpack = require('webpack');

/** @type {webpack.Configuration} */
module.exports = {
    entry: path.join(__dirname, './src/jsonata.js'),
    mode: 'none',
    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    optimization: {
        minimize: false,
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /src/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            plugins: [
                                // convert async/await to promises. we'll then use
                                'babel-plugin-transform-async-to-promises',
                            ],
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
