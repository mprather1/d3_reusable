const webpack = require("webpack");
const path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'app', 'index.html'),
  filename: 'index.html',
  inject: 'body'
});

var paths = {
  ENTRY: path.join(__dirname, 'app', 'main.js'),
  OUTPUT_FILENAME: "bundle.js",
  OUTPUT: path.join(__dirname, "app", 'static'),
  APP: path.join(__dirname, 'app')
};

module.exports = {
  entry: [
    paths.ENTRY
  ],
  devServer: {
    contentBase: "./app"
  },
  resolve: {
    alias: {
      "marionette": "backbone.marionette"
    }
  },
  module: {
    preLoaders: [
     {
       test: /\.js$/,
       include: __dirname + '/app',
       exclude: [/node_modules/, paths.APP + '/public', paths.APP + '/bower_components'],
       loader: 'jshint-loader'
      }
    ],
    loaders: [
      { test: /\.html/, include: paths.APP + '/templates', loader: "underscore-template-loader" }
    ],
  },
  output: {
    filename: paths.OUTPUT_FILENAME,
    path: paths.OUTPUT
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   mangle: true,
    //   sourcemap: false,
    //   beautify: false,
    //   dead_code: true
    // })
  ]
};