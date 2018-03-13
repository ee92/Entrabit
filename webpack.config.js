const path = require('path')

module.exports = {
  entry: "./src/app.jsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"]
  }
};
