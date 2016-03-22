/* eslint-disable no-var, strict */
'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.es6',
  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: 'build/',
    filename: 'koi.js',
    chunkFilename: '[id].[hash].js',
    libraryTarget: "umd",
    library: "koi"
  },
  module: {
    loaders: [{
      test: /\.es6?$/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^$/)
  ],
  resolve: {
    extensions: ['', '.js', '.es6']
  }
};
