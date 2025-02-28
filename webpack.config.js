import path from "path";

const config = {
  entry: "./src/main.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: ["node_modules"],
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.app.json",
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.module\.scss$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } },
          "sass-loader",
        ],
      },
      {
        test: /\.gif$/,
        type: "asset/inline",
      },
      {
        test: /\.(ttf|eot|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss", ".json"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve("./dist"),
  },
};

export default config;
