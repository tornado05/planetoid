const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

module.exports = {
    module: {
        stats: {
            colors: true,
            modules: true,
            reasons: true,
            errorDetails: true
        },
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",

                options: {
                    presets: ["env"]
                }
            },
            {
                test: /\.(less|css)$/,

                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",

                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader",

                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new UglifyJSPlugin({ compress: { warnnings: true } }),
        new MiniCssExtractPlugin({ filename: "style.css" }),
        new CopyWebpackPlugin([{ from: 'templates/*.html', to: 'dist' }]),
        new UnminifiedWebpackPlugin()
    ],
    entry: 0,

    output: {
        filename: "[name].min.[chunkhash].js",
        chunkFilename: "[name].min.[chunkhash].js",
        path: path.resolve(__dirname, "dist")
    },

    mode: "production"
}
