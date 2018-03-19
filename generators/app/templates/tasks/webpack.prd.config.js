/* eslint-disable func-names, no-useless-escape, object-shorthand */

// modules
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

// webpack plugins
const AssetsPlugin = require('assets-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const { InjectManifest } = require('workbox-webpack-plugin');

// load base configuration.
const baseConfig = require('./webpack.config');

// Get paths.
const paths = require('../core/paths');

// Load base configuration.
module.exports = merge.smart(baseConfig, {
  cache: false,
  devtool: '#source-map',

  entry: {
    critical: ['sass/critical.scss'],
    styleguide: ['sass/styleguide.scss'],
    main: ['sass/main.scss', 'js/main'],
    offline: ['sass/offline.scss'],
  },

  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.(jpeg|jpg|gif|png|svg)(\?.+)?$/,
        use: [
          'url-loader?limit=10000',
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
      },
    ],
  },

  output: {
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[name]-[chunkhash].js',
    path: paths.dist,
    publicPath: '/sitefiles/dist/',
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: require.resolve('workbox-sw'), to: 'workbox-sw.js' },
    ]),
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
        return bundleByName(module, ['node_modules', 'lib/', 'vendor/']);
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
        return bundleByName(module, ['angular-ui', '@uirouter']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'fancybox',
      children: true,
      minChunks(module) {
        return bundleByName(module, ['fancybox']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'moment',
      children: true,
      minChunks(module) {
        return bundleByName(module, ['moment']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'react',
      children: true,
      minChunks(module) {
        return bundleByName(module, ['react']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'redux',
      children: true,
      minChunks(module) {
        return bundleByName(module, ['redux']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'titon',
      children: true,
      minChunks(module) {
        return bundleByName(module, ['titon']);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'videojs',
      children: true,
      minChunks(module) {
        return bundleByName(module, ['video.js', 'videojs-youtube']);
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin({
      allChunks: true,
      disable: false,
      filename: '[name]-[chunkhash].css',
    }),
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
    new InjectManifest({
      exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/, /stats\.json/],
      swSrc: paths.sw,
    }),
  ],
});

/** Check if module name contains the specified names. */
function bundleByName(module, names) {
  if (!module.resource) {
    return false;
  }

  // This prevents stylesheet resources with the .css or .scss extension
  // from being moved from their original chunk to the vendor chunk
  if (/^.*\.(css|scss)$/.test(module.resource)) {
    return false;
  }

  return names.some(
    name =>
      module.resource.indexOf(name) >= 0 &&
      module.resource.indexOf('node_modules') >= 0
  );
}
