const path = require('path');
const nodeExternals = require('webpack-node-externals');
const mode = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod' ? 'production' : 'development';

module.exports = {
  entry: './src/App.ts',
  devtool: "cheap-module-eval-source-map",
  mode: mode,
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.ts',
      '.tsx'
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "test")
        ],
        use: [
          {
            loader: 'ts-loader'
          }
        ],
      }
    ]
  }
};
