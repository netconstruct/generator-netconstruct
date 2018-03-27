/* eslint-disable func-names, no-useless-escape, object-shorthand */

// modules
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

// webpack plugins
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

// load base configuration.
const baseConfig = require('./webpack.config');

// Get paths.
const paths = require('../core/paths');

module.exports = merge.smart(baseConfig, {
  cache: true,
  devtool: '#cheap-source-map',
  mode: 'development',

  entry: {
    critical: ['sass/critical.scss'],
    styleguide: ['sass/styleguide.scss'],
    main: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true',
      'sass/main.scss',
      'js/main',
    ],
    offline: ['sass/offline.scss'],
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          // todo: swap to MiniCssExtractPlugin.loader after https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34 resolved
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
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
        use: ['file-loader'],
      },
    ],
  },

  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: paths.dist,
    publicPath: '/sitefiles/dist/',
    // use for AssetsPlugin to filter out hot updates (https://github.com/ctrlplusb/react-universally/pull/566)
    hotUpdateChunkFilename: '[hash].hot-update.js',
  },

  optimization: {
    noEmitOnErrors: true,
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(paths.sitefiles, 'src/js/webforms/combined.min.js'),
        to: 'webforms-combined.min.js',
      },
    ]),
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
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    // todo: add after https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34 resolved
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    // }),
    new StatsWriterPlugin({
      transform(data, opts) {
        const stats = opts.compiler.getStats().toJson({ chunkModules: true });
        return JSON.stringify(stats, null, 2);
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
