const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

const envKeys = { 'process.env.API_URL': JSON.stringify(process.env.API_URL) };

const paths = {
  BUILD: path.resolve(__dirname, './build'),
  SRC: path.resolve(__dirname, './client'),
};

module.exports = {
  entry: {
    app: paths.SRC,
  },
  output: {
    path: paths.BUILD,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(png|gif|jpg|JPG|jpeg|ico)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: paths.BUILD,
    hot: true,
    port: 9000,
    historyApiFallback: true,
  },
};
