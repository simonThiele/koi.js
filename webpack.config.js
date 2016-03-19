/* eslint-disable no-var, strict */
'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: 'build/',
    filename: 'index.js',
    chunkFilename: '[id].[hash].js'
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
