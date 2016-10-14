const path = require('path');
const webpack = require('webpack');
const PLATFORM = 'mac';

module.exports = {
  entry: [
    path.join(__dirname, 'src', 'index.jsx')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: 'babel',
        options: {
          babelrc: false,
          cacheDirectory: PLATFORM === 'win32' ? true : '/tmp/',
          "presets": [
            "react",
            ["es2015", { "modules": false }],
            "stage-0",
          ],
          env: {
            development: {
              "plugins": [
                ["react-transform", {
                  "transforms": [{
                    "transform": "react-transform-hmr",
                    "imports": ["react"],
                    "locals": ["module"]
                  }, {
                    "transform": "react-transform-catch-errors",
                    "imports": ["react", "redbox-react"]
                  }]
                }],
                "transform-runtime",
                "add-module-exports",
                "transform-class-properties"
              ]
            },
            production: {
              "plugins": [
                "transform-runtime",
                "add-module-exports",
                "transform-class-properties"
              ]
            }
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      }
    })
  ]
}
