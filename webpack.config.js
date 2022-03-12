const CopyPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const webpack = require('webpack');

const fs = require('fs');

    // let templates = [];
    // let dir = 'src';
    // let files = fs.readdirSync(dir);

    // files.forEach(file => {
    // if (file.match(/\.pug$/)) {
    //     let filename = file.substring(0, file.length - 4);
    //     templates.push(
    //     new HtmlWebpackPlugin({
    //         template: dir + '/' + filename + '.pug',
    //         filename: filename + '.html'
    //     })
    //     );
    // }
    // });

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + "/dist/",
        filename: "bundle.js",
        chunkFilename: '[name].js'
    },
    watchOptions: {
        poll: 1000 // Check for changes every second
    },
    devServer: {
        contentBase: __dirname,
        hot: true,
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        },
                    ],
                })
            },
            {
                test:/\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader?name=./font/PoliticalPoltical/[name].[ext]'
                    },
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
        ]
    },

  plugins: [
    // ...templates,
    new HtmlWebpackPlugin({
        template: __dirname + '/src/pug/pages/index.pug',
        filename: __dirname + '/dist/index.html'
         }),
    new HtmlWebpackPlugin({
        template: __dirname + '/src/pug/pages/about.pug',
        filename: __dirname + '/dist/about.html'
        }),
    new HtmlWebpackPlugin({
        template: __dirname + '/src/pug/pages/contacts.pug',
        filename: __dirname + '/dist/contacts.html'
        }),
    new ExtractTextPlugin('[name].css'),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 8080,
      server: { baseDir: __dirname + "/dist/" },
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
    }),
    new CleanWebpackPlugin('dist', {} ),
    new CopyPlugin([
        { from:  'src/assets', to: 'assets'}
    ]),
    ],
    optimization: {
        minimizer: [
          new TerserPlugin(),
          new OptimizeCSSAssetsPlugin({})
        ]
    }
};