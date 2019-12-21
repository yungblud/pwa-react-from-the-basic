const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
})

const { NODE_ENV: mode } = process.env
const isDevelopment = mode === 'development'
console.log('MODE:', isDevelopment ? 'DEV' : 'PROD')

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
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: isDevelopment
                                    ? '[path][name]__[local]--[hash:base64:5]'
                                    : '[name]__[local]--[hash:base64:5]',
                            },
                            importLoaders: 1,
                            sourceMap: true,
                            // minimize: true,
                        },
                    },
                    // 'style-loader',
                    // 'css-loader',
                ],
            },
        ],
    },
    plugins: [htmlPlugin],
}
