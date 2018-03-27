/* eslint-disable func-names, no-useless-escape, object-shorthand */
const path = require('path');

// Get paths.
const paths = require('../core/paths');

const baseConfig = {
  externals: {
    jquery: 'jQuery',
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
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
        use: [
          'imports-loader?exports=>undefined',
          'exports-loader?window.loadCSS',
        ],
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
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: /ng\-redux/,
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [paths.js],
        include: /aos/,
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [paths.js],
        include: /@netc/,
      },
      {
        test: /\.js$/,
        use: ['imports-loader?define=>false'],
        exclude: [paths.js],
        include: /scrollmagic/,
      },
      {
        test: /underscore\.js$/,
        use: ['expose-loader?_'],
        exclude: [paths.js],
        include: /underscore/,
      },
      {
        test: /\.js$/,
        use: ['imports-loader?this=>window&exports=>false&define=>false'],
        exclude: [paths.js],
        include: /video\.js/,
      },
      {
        test: /\.js$/,
        use: ['imports-loader?this=>window&exports=>false&define=>false'],
        exclude: [paths.js],
        include: /videojs-youtube/,
      },
    ],

    noParse: [
      // Ignore prebuilt warning for videojs
      /[\/\\]video\.js$/,
      /[\/\\]video\.min\.js$/,
      /[\/\\]videojs-youtube/,
    ],
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
      'scrollmagic-core': 'scrollmagic/scrollmagic/uncompressed/ScrollMagic',
      'scrollmagic-gsap': 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap',
      select2: path.resolve(path.join(paths.root, 'node_modules', 'select2')),
      TweenMax: 'gsap/TweenMax',
      TweenLite: 'gsap/TweenLite',
      TimelineMax: 'gsap/TimelineMax',
      TimelineLite: 'gsap/TimelineLite',
      'videojs-core': 'video.js/dist/video.js',
      'videojs-youtube': 'videojs-youtube/dist/Youtube',
    },
    extensions: ['.js', '.jsx', '.json'],
  },
};

module.exports = baseConfig;
