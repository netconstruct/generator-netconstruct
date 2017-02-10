const merge = require('webpack-merge');

// Load webpack plugins.
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');

const paths = require('../core/paths');
const baseConfig = Object.create(require('./webpack.base.config'));

// Load base configuration.
const config = merge.smart(true, {}, baseConfig, {
  cache: true,
  devtool: '#cheap-source-map',

  entry: {
    head: ['modernizr'],
    main: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true',
      'sass/main.scss',
      'js/main',
    ],
  },

  module: {
    rules: [{
      test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
      use: ['file-loader?name=fonts/[name].[ext]'],
      exclude: paths.fonts,
    }, {
      test: /\.(jpeg|jpg|gif|png|svg)(\?.+)?$/,
      use: ['file-loader?name=img/[name].[ext]'],
      exclude: paths.fonts,
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
      use: ['file-loader?name=fonts/[name].[ext]'],
      include: paths.fonts,
    }],
  },

  output: {
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    path: paths.dist,
    publicPath: '/sitefiles/dist/',
  },

  plugins: [
    new CleanWebpackPlugin([paths.dist], { root: paths.sitefiles }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new ExtractTextPlugin({ allChunks: true, disable: false, filename: '[name].css' }),
    new HotModuleReplacementPlugin(),
    new LoaderOptionsPlugin({
      context: paths.root,
      debug: true,
      eslint: {
        ignorePath: paths.eslintIgnore,
      },
    }),
    new NoErrorsPlugin(),
  ],
});

module.exports = config;
