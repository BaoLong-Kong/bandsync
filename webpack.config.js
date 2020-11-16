var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { JavascriptModulesPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/settings.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'settings_bundle.js'
  },
  mode: 'development',
  entry: './src/setbeats.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'setbeats_bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  optimization: {
    minimize: false
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      // Load a custom template (lodash by default)
      template: 'index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'settings.html',
      template: 'settings.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'setbeats.html',
      template: 'setbeats.html'
    }),
    // new MiniCssExtractPlugin(),
  ]
};
