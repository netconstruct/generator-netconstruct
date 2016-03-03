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
    cache: true,
    debug: true,
    devtool: '#cheap-source-map',

    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true',
      'sass/main.scss',
      'js/main'
    ],

    jshint: {
      debug: true,
      emitErrors: false,
      esnext: true,
      failOnHint: false
    },

    plugins: [
      new BowerWebpackPlugin({
        includes: /.*\.js/,
        searchResolveModulesDirectories: false
      }),
      new ExtractTextPlugin('main.css'),
      new webpack.DefinePlugin({
        DEBUG: true
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  });

  module.exports = config;
})();
