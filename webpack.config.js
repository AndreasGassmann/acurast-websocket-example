const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: ['./src/index.ts']
    },
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'docs'),
        library: {
            name: 'AcurastExample',
            type: 'umd',
            umdNamedDefine: true
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '.'),
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
        })
    ]
};
