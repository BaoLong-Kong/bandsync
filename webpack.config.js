var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { JavascriptModulesPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    settings: './src/settings.js',
    setbeats: './src/setbeats.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_bundle.js',
    
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
    },
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
      template: 'index.html',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'settings.html',
      template: 'settings.html',
      inject: true,
      chunks: ['settings'],
    }),
    new HtmlWebpackPlugin({
      filename: 'setbeats.html',
      template: 'setbeats.html',
      inject: true,
      chunks: ['setbeats']
    }),
    // new MiniCssExtractPlugin(),
  ]
};
