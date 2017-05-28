module.exports = {
  entry: "./main",
  output: { filename: "app.js" },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: { tsconfig:  __dirname + '/tsconfig.json' }
        }]
      }
  ]},
  resolve: {
    extensions: [".ts", ".js"]
  }
}
