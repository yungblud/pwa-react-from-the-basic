const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
})

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'index.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    // },
                    // {
                    //     loader: 'css-loader',
                    //     options: {
                    //         modules: true,
                    //         importLoaders: 1,
                    //         localIdentName: '[name]_[local]_[hash:base64]',
                    //         sourceMap: true,
                    //         minimize: true,
                    //     },
                    // },
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [htmlPlugin],
}
