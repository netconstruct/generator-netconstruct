(function () {
  var path = require('path');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');

  var exclude = /(bower_components|node_modules|web_modules)/;

  var __root = path.resolve(__dirname, '../');

  module.exports = {
    context: __root,

    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'jshint',
          exclude: exclude
        }
      ],

      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('css?sourceMap')
        },
        {
          test: /\.(eot|ttf|woff)$/,
          loader: 'url?limit=100000'
        },
        {
          test: /\.html$/,
          loader: 'raw'
        },
        {
          test: /\.js$/,
          loader: 'ng-annotate!babel',
          exclude: exclude
        },
        {
          test: /\.(gif|jpeg|jpg|png|svg)$/,
          loader: 'file!image-webpack'
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
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

    resolve: {
      alias: {
        'fonts': path.join(__root, 'ui/fonts'),
        'img': path.join(__root, 'ui/img'),
        'js': path.join(__root, 'ui/js'),
        'sass': path.join(__root, 'ui/sass')
      },
      modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
    }
  };
})();
