/* eslint-disable func-names, no-useless-escape, object-shorthand */

// webpack plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Get paths.
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
      use: [{
        loader: 'eslint-loader',
        options: { ignorePath: paths.eslintIgnore },
      }],
      enforce: 'pre',
      include: [paths.js],
      exclude: [paths.vendor],
    }, {
      test: /\.js$/,
      use: [
        'ng-annotate-loader',
        'babel-loader',
      ],
      include: [paths.js],
      exclude: [paths.vendor],
    }, {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?-autoprefixer',
          'postcss-loader',
          'sass-loader',
        ],
        publicPath: '/sitefiles/dist/',
      }),
    }, {
      test: /\.js$/,
      use: [
        'imports-loader?this=>window',
        'exports-loader?window.Modernizr',
      ],
      include: /modernizr/,
    }, {
      test: /angular\.js$/,
      use: ['exports-loader?window.angular'],
      exclude: [paths.js],
      include: /angular/,
    }, {
      test: /loadcss\.js$/,
      use: [
        'imports-loader?exports=>undefined',
        'exports-loader?window.loadCSS',
      ],
      exclude: [paths.js],
      include: /fg-loadcss/,
    }, {
      test: /cssrelpreload\.js$/,
      use: ['imports-loader?this=>window'],
      exclude: [paths.js],
      include: /fg-loadcss/,
    }, {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: [paths.js],
      include: /lodash-es/,
    }, {
      test: /\.js$/,
      use: [
        'imports-loader?this=>window',
        'exports-loader?window.Modernizr',
      ],
      exclude: [paths.js],
      include: /modernizr/,
    }, {
      test: /\.js$/,
      use: ['imports-loader?define=>false'],
      exclude: [paths.js],
      include: /scrollmagic/,
    }, {
      test: /underscore\.js$/,
      use: ['expose-loader?_'],
      exclude: [paths.js],
      include: /underscore/,
    }, {
      test: /\.js$/,
      use: ['imports-loader?this=>window&exports=>false&define=>false'],
      exclude: [paths.js],
      include: /video\.js/,
    }, {
      test: /\.js$/,
      use: ['imports-loader?this=>window&exports=>false&define=>false'],
      exclude: [paths.js],
      include: /videojs-youtube/,
    }],

    noParse: [
      // Ignore prebuilt warning for videojs
      /[\/\\]video\.js$/,
      /[\/\\]video\.min\.js$/,
      /[\/\\]videojs-youtube/,
    ],
  },

  resolve: {
    alias: {
      fonts: paths.fonts,
      img: paths.img,
      js: paths.js,
      sass: paths.sass,
      vendor: paths.vendor,

      'loadcss-core': 'fg-loadcss/src/loadcss',
      'loadcss-polyfill': 'fg-loadcss/src/cssrelpreload',
      modernizr: 'vendor/modernizr.custom.js',
      'scrollmagic-core': 'scrollmagic/scrollmagic/uncompressed/ScrollMagic',
      'scrollmagic-gsap': 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap',
      TweenMax: 'gsap/TweenMax',
      TweenLite: 'gsap/TweenLite',
      TimelineMax: 'gsap/TimelineMax',
      TimelineLite: 'gsap/TimelineLite',
      'videojs-core': 'video.js/dist/video.js',
      'videojs-youtube': 'videojs-youtube/dist/Youtube',
    },
  },
};

module.exports = baseConfig;
