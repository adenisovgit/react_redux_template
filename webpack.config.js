// @ts-check

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
  const isProduction = env.production === 'prod';
  console.debug('Production = ', isProduction);

  const config = {
    mode: isProduction ? 'production' : 'development',
    entry: [
      `${__dirname}/src/index.js`,
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: `${__dirname}/dist/public`,
      publicPath: '/',
    },
    devtool: isProduction ? '' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: [
            /node_modules/,
          ],
        },
        {
          test: /\.html/,
          loader: 'raw-loader',
        },
        {
          test: /\.(sass|scss)$/,
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${__dirname}/assets/index.html`,
      }),
    ],
    devServer: {
      contentBase: `${__dirname}/dist/public`,
      port: 7700,
    },
  };

  if (isProduction) {
    config.plugins.push(
      // @ts-ignore
      new UglifyJSPlugin(),
      new CopyWebpackPlugin([{
        from: `${__dirname}/assets`,
      }]),
    );
  }
  return config;
};
