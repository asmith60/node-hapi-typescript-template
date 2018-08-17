const path = require('path');
const nodeExternals = require('webpack-node-externals');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const isCoverage = process.env.NODE_ENV === 'unit_test';

module.exports = {
  devtool: "inline-cheap-module-source-map",
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.ts',
      '.tsx'
    ],
    plugins: [new tsconfigPathsPlugin()]
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  module: {
    rules: [].concat(
      isCoverage ? {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test')
        ],
        loader: 'istanbul-instrumenter-loader'
      } : [],
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test')
        ],
        loader: 'ts-loader'
      }
    ),
  }
};
