'use strict';
module.exports = (env={}) => {
  const config = {
    entry: ['./src/core/Node.ts'],
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