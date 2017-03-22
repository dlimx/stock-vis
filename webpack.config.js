const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, 'src', 'App.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  resolve: {
    'alias': {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    },
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  devServer: {
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true
        }
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [
          path.resolve('src'),
          path.resolve('node_modules/preact-compat/src')
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
}
