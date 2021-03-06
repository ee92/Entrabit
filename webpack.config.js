const path = require('path')
const Jarvis = require("webpack-jarvis")

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
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: "file-loader?name=/public/images/[name].[ext]"
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"]
  }
};
