/**
 * COMMON WEBPACK CONFIGURATION
 */

import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import babel from '../babel.config'

process.noDeprecation = true

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  target: 'web', // Make web variables accessible to webpack, e.g. window
  resolve: {
    alias: {
      // Resolving '@import "~styles/..." inside scss files
      'styles': path.resolve(__dirname, '../src/styles/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            ...babel,
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              import: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              ident: 'postcss',
              plugins: () => [
                require('postcss-cssnext')(),
                require('postcss-modules-values')
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              outputStyle: 'expanded'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                gifsicle: {
                  interlaced: true
                },
                mozjpeg: {
                  progressive: true
                },
                optipng: {
                  optimizationLevel: 7
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      // {
      //   test: /(?!node_modules\/chronobank-smart-contracts\/build\/contracts\/).+\.json$/, // all JSON files except contracts
      //   loader: 'json-loader',
      //   exclude: [
      //     path.resolve('node_modules/chronobank-smart-contracts/build/contracts')
      //   ]
      // },
      {
        test: /node_modules\/chronobank-smart-contracts\/build\/contracts\/.+\.json$/, // only ABI contracts
        loader: path.resolve('./config/abi-loader'),
        include: [
          path.resolve('node_modules/chronobank-smart-contracts/build/contracts')
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
