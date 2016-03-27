(function () {
  var extend = require('extend');
  var webpack = require('webpack');

  // Load webpack plugins.
  var BowerWebpackPlugin = require('bower-webpack-plugin');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');

  // Clone base.
  var config = Object.create(require('./webpack.base.config'));

  // Load base configuration.
  config = extend(true, {}, config, {
    cache: false,
    debug: false,
    devtool: '',

    entry: [
      'sass/main.scss',
      'js/main'
    ],

    jshint: {
      debug: false,
      emitErrors: true,
      esnext: true,
      failOnHint: true
    },

    plugins: [
      new BowerWebpackPlugin({
        includes: /.*\.js/,
        searchResolveModulesDirectories: false
      }),
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
