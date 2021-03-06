/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: ['./showcase/showcase.tsx'],
    output: {
        path: path.resolve(__dirname, './showcase/dist'),
        filename: 'index.js'
    },
    mode: 'development',
    devServer: {
        contentBase: './showcase/dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.json'
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './showcase/static',
                    to: ''
                }
            ]
        }),
        new HtmlWebpackPlugin({
            templateContent: ({ htmlWebpackPlugin }) => `
            <html>
                <head>
                ${htmlWebpackPlugin.tags.headTags}
                </head>
                <body>
                    <div id="root" />
                    ${htmlWebpackPlugin.tags.bodyTags}
                </body>
            </html>
          `
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', 'css']
    },
    devtool: 'source-map'
}
