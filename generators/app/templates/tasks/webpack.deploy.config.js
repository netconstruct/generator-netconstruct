(function () {
  var extend = require('extend');
  var path = require('path');
  var webpack = require('webpack');

  // Load webpack plugins.
  var BowerWebpackPlugin = require('bower-webpack-plugin');
  var CleanWebpackPlugin = require('clean-webpack-plugin');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');

  // Clone base.
  var config = Object.create(require('./webpack.base.config'));

  var __root = path.resolve(__dirname, '../');

  // Load base configuration.
  config = extend(true, {}, config, {
    cache: false,
    debug: false,
    devtool: '',

    entry: {
      'head': ['modernizr'],
      'main': [
        'sass/main.scss',
        'js/main'
      ]
    },

    jshint: {
      debug: false,
      emitErrors: true,
      esnext: true,
      failOnHint: true
    },

    plugins: [
      new CleanWebpackPlugin([path.join(__root, '../dist')]),
      new ExtractTextPlugin('main.css'),
      new webpack.DefinePlugin({
        DEBUG: false
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
  });

  module.exports = config;
})();
