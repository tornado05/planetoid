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
        new UglifyJSPlugin(),
        new MiniCssExtractPlugin({ filename: "style.css" }),
        new CopyWebpackPlugin([{ from: 'templates/*.html', to: 'dist' }])
    ],
    entry: 0,

    output: {
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist")
    },

    mode: "production"
}
