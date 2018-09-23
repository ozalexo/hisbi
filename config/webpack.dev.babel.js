/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
// import CleanWebpackPlugin from 'clean-webpack-plugin'
import baseWebpackConfig from './webpack.base.babel'

module.exports = Object.assign({}, baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
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
    historyApiFallback: false
  },
  plugins: [
    // new CleanWebpackPlugin(['../dist']),
    new webpack.HotModuleReplacementPlugin(),
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

// module.exports = require('./webpack.base.babel')({
//   mode: 'development',
//   entry: [
//     path.resolve(__dirname, '../src/index.js')
//   ],
//   output: {
//     filename: '[name].js',
//     chunkFilename: '[name].chunk.js'
//   },
//   plugins: [
//     new CleanWebpackPlugin(['dist']),
//     new webpack.HotModuleReplacementPlugin(),
//     new HtmlWebpackPlugin({
//       inject: true,
//       template: 'public/index.html'
//     }),
//     new CircularDependencyPlugin({
//       exclude: /a\.js|node_modules/,
//       failOnError: false
//     })
//   ],
//   // Emit a source map for easier debugging
//   // See https://webpack.js.org/configuration/devtool/#devtool
//   devtool: 'eval-source-map',
//   devServer: {
//     contentBase: './dist',
//     compress: false,
//     port: 3000,
//     watchContentBase: true,
//     progress: true,
//     hot: true
//   },
//   performance: {
//     hints: false
//   }
// })
