var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/settings.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'settings_bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
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
    new MiniCssExtractPlugin(),
  ]
};
