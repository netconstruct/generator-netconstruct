/* eslint-disable func-names, no-useless-escape, object-shorthand */

// modules
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

// webpack plugins
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

// load base configuration.
const baseConfig = require('./webpack.config');

// Get paths.
const paths = require('../core/paths');

module.exports = merge.smart(baseConfig, {
  cache: true,
  devtool: '#cheap-source-map',

  entry: {
    critical: [
      'sass/critical.scss',
    ],
    styleguide: [
      'sass/styleguide.scss',
    ],
    main: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true',
      'sass/main.scss',
      'js/main',
    ],
    offline: [
      'sass/offline.scss',
    ],
  },

  module: {
    rules: [{
      test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
      use: ['file-loader'],
    }, {
      test: /\.(jpeg|jpg|gif|png|svg)(\?.+)?$/,
      use: ['file-loader'],
    }],
  },

  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: paths.dist,
    publicPath: '/sitefiles/dist/',
  },

  plugins: [
    new CleanWebpackPlugin([paths.dist], {
      exclude: path.join(paths.dist, '.gitignore'),
      root: paths.sitefiles,
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: paths.dist,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new ExtractTextPlugin({ allChunks: true, disable: false, filename: '[name].css' }),
    new HtmlWebpackPlugin({
      filename: 'offline.html',
      inject: false,
      template: paths.offline,
    }),
    new StatsWriterPlugin({
      transform(data, opts) {
        const stats = opts.compiler.getStats().toJson({ chunkModules: true });
        return JSON.stringify(stats, null, 2);
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
