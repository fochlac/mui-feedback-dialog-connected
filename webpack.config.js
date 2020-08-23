/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: ['./lib/FeedbackDialog.tsx'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        library: 'mui-feedback-dialog',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        '@material-ui/icons': '@material-ui/icons',
        '@material-ui/core': '@material-ui/core',
        '@material-ui/core/SvgIcon': '@material-ui/core/SvgIcon',
        react: 'react',
        reactDOM: 'react-dom'
    },
    mode: 'production',
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
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', 'css']
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
}
