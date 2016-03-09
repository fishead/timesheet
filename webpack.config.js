const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

process.env.BABEL_ENV = TARGET;

const common = {
  entry: [
    APP_PATH,
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: BUILD_PATH,
    filename: '[hash].bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: [APP_PATH],
      },
    ],
  },
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devTool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ title: 'Timesheet' }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js',
      }),
    ],
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    plugins: [
      new HtmlWebpackPlugin({ title: 'Timesheet' }),
    ],
  });
}
