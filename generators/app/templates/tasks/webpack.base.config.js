(function () {
  var autoprefixer = require('autoprefixer');
  var path = require('path');
  var pseudoelements = require('postcss-pseudoelements');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');

  var exclude = [
    /bower_components/,
    /node_modules/,
    /vendor/,
    /web_modules/,
  ];

  var __root = path.resolve(__dirname, '../');

  module.exports = {
    context: __root,

    eslint: {
      ignorePath: path.join(__root, '.eslintignore'),
    },

    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'eslint',
          exclude: exclude
        }
      ],

      loaders: [
        {
          test: /\.css$/,
          loader: 'css?-autoprefixer!postcss'
        },
        {
          test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
          loader: 'url?limit=32768'
        },
        {
          test: /\.html$/,
          loader: 'html'
        },
        {
          test: /\.js$/,
          loader: 'ng-annotate!babel',
          exclude: exclude
        },
        {
          test: /\.(jpeg|jpg|gif|png|svg)(\?.+)?$/,
          loader: 'url?limit=32768!image-webpack'
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css?root=../../../..&-autoprefixer!postcss!sass')
        },

        {
          test: /angular\.js$/,
          loader: 'exports?window.angular'
        },
        {
          test: /jquery\.js$/,
          loader: 'expose?$'
        },
        {
          test: /jquery\.js$/,
          loader: 'expose?jQuery'
        },
        {
          test: /\.js$/,
          loader: 'imports?this=>window!exports?window.Modernizr',
          include: /modernizr/
        },
        {
          test: /underscore\.js$/,
          loader: 'expose?_'
        }
      ]
    },

    output: {
      chunkFilename: '[name].bundle.js',
      filename: '[name].bundle.js',
      path: path.join(__root, '../dist'),
      publicPath: '/sitefiles/dist/',
    },

    postcss: [
      autoprefixer({
        browsers: ['ie 10', 'ie 11', 'last 2 versions']
      }),
      pseudoelements()
    ],

    resolve: {
      alias: {
        'fonts': path.join(__root, 'ui/fonts'),
        'img': path.join(__root, 'ui/img'),
        'js': path.join(__root, 'ui/js'),
        'sass': path.join(__root, 'ui/sass'),
        'vendor': path.join(__root, 'ui/js/vendor'),

        'modernizr': 'vendor/modernizr.custom.js',
      },
      modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
    }
  };
})();
