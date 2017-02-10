/* eslint-disable func-names, object-shorthand */

// Load webpack plugins.
const AssetsPlugin = require('assets-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Md5HashPlugin = require('webpack-md5-hash');

const paths = require('../core/paths');

const baseConfig = {
  externals: {
    jquery: 'jQuery',
  },

  module: {
    rules: [{
      test: /\.html$/,
      use: ['html-loader'],
    }, {
      test: /\.js$/,
      use: ['eslint-loader'],
      enforce: 'pre',
      include: [paths.ui],
      exclude: [paths.vendor],
    }, {
      test: /\.js$/,
      use: ['ng-annotate-loader', 'babel-loader'],
      include: [paths.ui],
      exclude: [paths.vendor],
    }, {
      test: /\.(css|scss)$/,
      // eslint-disable-next-line max-len
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?-autoprefixer', 'postcss-loader', 'sass-loader'],
        publicPath: '/sitefiles/dist/',
      }),
    }, {
      test: /\.js$/,
      use: ['imports-loader?this=>window', 'exports-loader?window.Modernizr'],
      include: /modernizr/,
    }],
  },

  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: paths.dist,
    publicPath: '/sitefiles/dist/',
  },

  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      path: paths.dist,
    }),
    new CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: function (module) {
        return isExternal(module);
      },
    }),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    // eslint-disable-next-line no-useless-escape
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new HtmlWebpackPlugin({
      filename: 'offline.html',
      inject: false,
      template: paths.offline,
    }),
    new Md5HashPlugin(),
  ],

  resolve: {
    alias: {
      fonts: paths.fonts,
      img: paths.img,
      js: paths.js,
      sass: paths.sass,
      ui: paths.ui,
      vendor: paths.vendor,

      modernizr: 'vendor/modernizr.custom.js',
    },
  },
};

module.exports = baseConfig;

/** Check if module is external. */
function isExternal(module) {
  const userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('bower_components') >= 0 ||
         userRequest.indexOf('node_modules') >= 0 ||
         userRequest.indexOf('vendor/') >= 0;
}
