const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",

    // Set this to the file that calls createRoot()
    entry: "./src/client/App.tsx",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
        clean: true
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "esbuild-loader",
                options: {
                    target: "esnext"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|mp3|wav)$/,
                type: "asset/resource"
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/client/index.html")
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/ASSETS"),
                    to: "ASSETS"
                }
            ]
        })
    ],

    devServer: {
        port: 3001,
        hot: true,
        historyApiFallback: true
    }
};