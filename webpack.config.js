// @ts-check

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const webpack = require('webpack');

require('dotenv').config();
const ENV = process.env.APP_ENV;

const isTest = ENV === 'test'
const isProd = ENV === 'prod';
function setDevTool() {
  if (isTest) {
    return 'inline-source-map';
  } else if (isProd) {
    return 'source-map';
  } else {
    return 'eval-source-map';
  }
}

const config = {
  entry: __dirname + "/assets/index.html",
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: setDevTool(),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.html/,
        loader: 'raw-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/assets/index.html',
    }),
    new DashboardPlugin(),
  ],
  devServer: {
    contentBase: __dirname + '/assets',
    port: 7700,
  }
}

if (isProd) {
  config.plugins.push(
    // @ts-ignore
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([{
      from: __dirname + '/assets'
    }])
  );
}; 

module.exports = config;
