const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/index.ts']
    },
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'docs'),
        clean: {
            keep: /index\.html$/
        },
        library: {
            name: 'AcurastExample',
            type: 'umd',
            umdNamedDefine: true
        }
    },
    optimization: {
        usedExports: true,
        minimize: true,
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 244000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        }
    },
    performance: {
        maxEntrypointSize: 244000,
        maxAssetSize: 244000,
        hints: 'warning'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './docs/'),
        },
        compress: true,
        port: 8080,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "buffer": require.resolve("buffer/"),
            "crypto": false,
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "process": require.resolve("process/browser"),
            "vm": require.resolve("vm-browserify")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_DEBUG': false
        }),
        new HtmlWebpackPlugin({
            template: './docs/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};
