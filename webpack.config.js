const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @type {import('webpack').Configuration} */
const config = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000&name=fonts/Icons/[name].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css', // 원하는 filename
    }),
    new HtmlWebpackPlugin({ template: 'src/client/views/index.html' }),
  ],
}

module.exports = config
