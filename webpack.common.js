const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Entry: Where Webpack starts bundling
  entry: "./src/index.js",

  // Output: Where the bundle goes
  output: {
    path: path.resolve(__dirname, "dist"), // Absolute path to the output directory
    filename: "main.js",
    clean: true, // Cleans the /dist folder before each build
  },

  // Loaders: Rules for processing different file types
  module: {
    rules: [
      {
        test: /\.css$/i, // Look for files ending in .css
        use: ["style-loader", "css-loader"], // Apply these loaders (right to left)
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Look for images
        type: "asset/resource", // Built-in Webpack 5 asset handling
      },
    ],
  },

  // Plugins: Extra functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Automatically injects the <script> tag into this HTML
    }),
  ],
};
