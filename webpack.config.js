const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { GenerateSW } = require('workbox-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: './index.html',
})

const pwaPlugin = new WebpackPwaManifest({
    name: 'react-memo-with-pwa',
    short_name: 'memo',
    description: 'react memo web app with pwa',
    background_color: '#ffffff',
    crossorigin: 'use-credentials',
    theme_color: '#eeeeee',
    icons: [
        {
            src: path.resolve('src/assets/Icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
        },
    ],
})

const workboxPlugin = new GenerateSW({
    include: [/\.html$/, /\.js$/],
})

const { NODE_ENV: mode } = process.env
const isDevelopment = mode === 'development'
console.log('MODE:', isDevelopment ? 'DEV' : 'PROD')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/build'),
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
    plugins: [htmlPlugin, pwaPlugin, workboxPlugin],
}
