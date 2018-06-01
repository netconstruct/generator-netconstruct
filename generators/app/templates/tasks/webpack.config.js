/* eslint-disable func-names, no-useless-escape, object-shorthand */
const path = require('path');

// Get paths.
const paths = require('../core/paths');

const baseConfig = {
  devtool: '#source-map',
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'eslint-loader',
            options: { ignorePath: paths.eslintIgnore },
          },
        ],
        enforce: 'pre',
        include: [paths.js],
        exclude: [paths.vendor],
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [paths.js],
        exclude: [paths.vendor],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].css',
            },
          },
          'extract-loader',
          {
            loader: 'css-loader',
            options: {
              autoprefixer: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
        include: [paths.fonts],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [paths.js],
        include: /@netc/,
      },
      {
        test: /loadcss\.js$/,
        use: ['imports-loader?exports=>undefined', 'exports-loader?window.loadCSS'],
        exclude: [paths.js],
        include: /fg-loadcss/,
      },
      {
        test: /cssrelpreload\.js$/,
        use: ['imports-loader?this=>window'],
        exclude: [paths.js],
        include: /fg-loadcss/,
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [paths.js],
        include: /lodash-es/,
      },
    ],
  },
  performance: {
    assetFilter: function (assetFilename) {
      // remove warning about stats.json file size
      if (/stats.json/.test(assetFilename)) {
        return false;
      }
      // remove warning about sourcemap file size
      if (/\.map$/.test(assetFilename)) {
        return false;
      }
      return true;
    },
  },
  resolve: {
    alias: {
      // Alias common src folders.
      fonts: paths.fonts,
      img: paths.img,
      js: paths.js,
      sass: paths.sass,
      vendor: paths.vendor,

      // Alias redux folders.
      actions: path.join(paths.js, 'redux/actions'),
      reducers: path.join(paths.js, 'redux/reducers'),
      middleware: path.join(paths.js, 'redux/middleware'),
      routes: path.join(paths.js, 'redux/routes'),

      // Alias lodash.
      lodash: 'lodash-es',

      // Alias preact.
      react: 'preact-compat',
      'react-dom': 'preact-compat',

      // Alias node modules.
      'loadcss-core': 'fg-loadcss/src/loadcss',
      'loadcss-polyfill': 'fg-loadcss/src/cssrelpreload',
    },
    extensions: ['.js', '.jsx', '.json'],
  },
};

module.exports = baseConfig;
