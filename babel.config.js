/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

/**
 * This is config for Babel 7.x
 *
 * See info
 * https://babeljs.io/docs/en/configuration
 * https://babeljs.io/docs/en/config-files#6x-vs-7x-babelrc-loading
 */

module.exports = (api) => {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        'debug': false,
        'modules': false
      }
    ],
    '@babel/preset-react'
  ]

  const plugins = [
    '@babel/plugin-proposal-export-namespace-from', // to use 'exports * as ...'
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-object-rest-spread',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-destructuring',
    ['@babel/plugin-proposal-decorators',
      { 'decoratorsBeforeExport': true }
    ],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-syntax-class-properties',
    ['@babel/plugin-proposal-class-properties', { 'loose': false }],
    'react-hot-loader/babel'
  ]

  const overrides = [
    {
      'test': ['./config'],
      'presets': [
        ['@babel/preset-env']
      ]
    }
  ]

  return {
    presets,
    plugins,
    overrides
  }
}
