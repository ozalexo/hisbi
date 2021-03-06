/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

import path from 'path'
// import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import baseWebpackConfig from './webpack.base.babel'
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin'

module.exports = Object.assign({}, baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
    // path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },
  devServer: {
    host: 'localhost',
    https: true,
    port: '3000',
    contentBase: path.join(__dirname, '../dist'),
    // publicPath: '/dist',
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(['../dist']),
    new CleanTerminalPlugin({
      message: 'Clean up...'
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    })
  ],
  performance: {
    hints: false
  }
})
