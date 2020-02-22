'use strict';
const path = require('path');

module.exports = (env={}) => {
    const config = {
        entry: path.join(__dirname, './src/index.ts'),
        output: {
            path: path.join(__dirname, 'lib'),
            libraryTarget: 'commonjs2',
            filename: 'index.js'
        },
        mode: env.development ? 'development' : 'production',
        target: 'node',
        devtool: env.development ? 'cheap-eval-source-map' : false,
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['node_modules', 'src', 'package.json'],
        },
        module: {
            rules: [
                {
                    test: /.ts$/,
                    use: 'ts-loader',
                }
            ]
        },
        plugins: [],
    }

    return config;
}
