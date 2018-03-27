/* eslint-disable func-names, no-useless-escape, object-shorthand */

// modules
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

// webpack plugins
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
  mode: 'production',

  entry: {
    critical: ['sass/critical.scss'],
    styleguide: ['sass/styleguide.scss'],
    main: ['sass/main.scss', 'js/main'],
    offline: ['sass/offline.scss'],
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              autoprefixer: false,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: [paths.fonts],
      },
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

  optimization: {
    concatenateModules: true,
    minimize: true,
    runtimeChunk: true,
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(paths.sitefiles, 'src/js/webforms/combined.min.js'),
        to: 'webforms-combined.min.js',
      },
    ]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new CleanWebpackPlugin([paths.dist], {
      exclude: path.join(paths.dist, '.gitignore'),
      root: paths.sitefiles,
    }),
    // note: https://github.com/kossnocorp/assets-webpack-plugin/issues/86
    new AssetsPlugin({
      filename: 'assets.json',
      path: paths.dist,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[chunkhash].css',
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
