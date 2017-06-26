/* eslint-disable func-names, no-useless-escape, object-shorthand */

// modules
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

// webpack plugins
const AssetsPlugin = require('assets-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

// load base configuration.
const baseConfig = require('./webpack.config');

// Get paths.
const paths = require('../core/paths');

// Load base configuration.
module.exports = merge.smart(baseConfig, {
  cache: false,
  devtool: '#source-map',

  entry: {
    critical: [
      'sass/critical.scss',
    ],
    styleguide: [
      'sass/styleguide.scss',
    ],
    main: [
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
      use: [
        'url-loader?limit=10000',
        {
          loader: 'image-webpack-loader',
          options: {}
        },
      ],
    }],
  },

  output: {
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[name]-[chunkhash].js',
    path: paths.dist,
    publicPath: '/sitefiles/dist/',
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new CleanWebpackPlugin([paths.dist], {
      exclude: path.join(paths.dist, '.gitignore'),
      root: paths.sitefiles,
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: paths.dist,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return bundleByName(module, [
          'bower_components',
          'node_modules',
          'vendor\/',
        ]);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'loadcss',
      minChunks(module) {
        return bundleByName(module, ['fg-loadcss']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'angular',
      children: true,
      minChunks(module) {
        return bundleByName(module, ['angular']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'angular-translate',
      children: true,
      minChunks(module) {
        return bundleByName(module, ['angular-translate']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'angular-ui',
      children: true,
      minChunks(module) {
        return bundleByName(module, ['angular-ui']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'videojs',
      children: true,
      minChunks(module) {
        return bundleByName(module, ['video.js', 'videojs-youtube']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'shared',
      minChunks: 2,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin({ allChunks: true, disable: false, filename: '[name]-[chunkhash].css' }),
    new HtmlWebpackPlugin({
      filename: 'offline.html',
      inject: false,
      template: paths.offline,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      comments: false,
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new StatsWriterPlugin({
      transform(data, opts) {
        const stats = opts.compiler.getStats().toJson({ chunkModules: true });
        return JSON.stringify(stats, null, 2);
      },
    }),
    new OfflinePlugin({
      AppCache: false,
      excludes: ['**/.*', '**/*.json', '**/*.map'],
      publicPath: '/sitefiles/dist/',
      version: '[hash]',
    }),
  ],
});

/** Check if module name contains the specified names. */
function bundleByName(module, names) {
  const userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return names.some(name => userRequest.indexOf(name) >= 0);
}
