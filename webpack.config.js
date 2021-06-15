const path = require("path");
const magicImporter = require('node-sass-magic-importer');

module.exports = {
    mode: "production",
    entry: [path.resolve(__dirname, "index.ts")],
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "index.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.json'],
        modules: ["node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                      loader: "style-loader"
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                importer: magicImporter()
                            }
                        }
                    }
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    }
};