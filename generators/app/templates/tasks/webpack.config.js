/* eslint-disable func-names, object-shorthand */

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

  resolve: {
    alias: {
      fonts: paths.fonts,
      img: paths.img,
      js: paths.js,
      sass: paths.sass,
      ui: paths.ui,
      vendor: paths.vendor,

      'countup-core': 'countup.js/dist/countUp.js',
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
