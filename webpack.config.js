const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

module.exports = {
    entry: './src/index.tsx', // our entry point, as mentioned earlier
    mode: ( 'development' === process.env.NODE_ENV ? 'development' : 'production' ),
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/, // matches .js, .ts, and .tsx files
                loader: 'babel-loader', // uses babel-loader for the specified file types (no ts-loader needed)
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/, // matches .css and .scss
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'build/[name].js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        publicPath: 'http://localhost:3000/dist/',
        hotOnly: true,
        historyApiFallback: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // used for hot reloading when developing

        // extract css to external stylesheet file
        new MiniCssExtractPlugin( {
            filename: 'build/styles.css'
        } ),

        // prepare HTML file with assets
        new HTMLWebpackPlugin( {
            filename: 'index.html',
            template: path.resolve( __dirname, 'public/index.html' ),
            minify: false,
        } ),

        // copy static files from `src` to `dist`
        new CopyWebpackPlugin( {
            patterns: [
                {
                    from: path.resolve( __dirname, 'public/assets' ),
                    to: path.resolve( __dirname, 'dist/assets' )
                }
            ]
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,

                vendor: {
                    chunks: 'all', // both : consider sync + async chunks for evaluation
                    name: 'vendor', // name of chunk file
                    test: /node_modules/, // test regular expression
                }
            }
        }
    },
    devtool: 'eval-source-map', // builds high quality source maps
}
