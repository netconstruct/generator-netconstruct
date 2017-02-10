const merge = require('webpack-merge');

// Load webpack plugins.
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const paths = require('../core/paths');
const baseConfig = Object.create(require('./webpack.base.config'));

// Load base configuration.
const config = merge.smart(baseConfig, {
  cache: false,
  devtool: '#source-map',

  entry: {
    head: ['modernizr'],
    main: [
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
    chunkFilename: '[name]-[hash].js',
    filename: '[name]-[hash].js',
    path: paths.dist,
    publicPath: '/sitefiles/dist/',
  },

  plugins: [
    new CleanWebpackPlugin([paths.dist], { root: paths.sitefiles }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin({ allChunks: true, disable: false, filename: '[name]-[hash].css' }),
    new LoaderOptionsPlugin({
      context: paths.root,
      debug: true,
      eslint: {
        ignorePath: paths.eslintIgnore,
      },
    }),
    new UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
});

module.exports = config;
