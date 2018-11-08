const path = require('path');

const webpack               = require('webpack');
const StyleLintPlugin       = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const SvgStorePlugin        = require('external-svg-sprite-loader');
const FractalModuleResolver = require('@gotoandplay/fractal-module-resolver-webpack-plugin');

const fractal           = require('./fractal.config.js');
const tsconfig          = require('./tsconfig.json');
const pkg               = require('./package.json');
const FractalPlugin     = require('./packages/fractal-webpack-plugin');
const TSConfigGenerator = require('./packages/tsconfig-generator-plugin');

/**
 * gotoAndReact class
 */
class gotoAndReact {
    constructor(env) {
        this.options = Object.assign({}, {
            production: false,
            path: '/',
        }, env);

        return this.getCompilers();
    }

    getCompilers() {
        return [this.getConfig('styleguide')];
    }

    getPlugins() {
        return [
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
            }),
            new SvgStorePlugin(),
            new StyleLintPlugin(),
            new webpack.EnvironmentPlugin({
                webpack: true
            }),
            new TSConfigGenerator({
                fractal: fractal,
                tsConfig: tsconfig,
                fileName: path.resolve(__dirname, path.join('tsconfig.json')),
            }),
            new FractalPlugin({
                fractal: fractal,
                isProduction: this.options.production,
                chunksOrder: ['vendor', 'global'],
            }),
        ];
    }

    getEntry() {
        return {
            global: ['./src/patterns/index.fractal.ts']
        };
    }

    getOutput() {
        return {
            filename: 'js/[name].js',
            path: path.resolve(__dirname, 'app/styleguide/public/inc'),
            publicPath: this.options.production ? '../../inc/' : '/inc/',
            library: '[name]',
            libraryTarget: 'window'
        };
    }

    getConfig(name) {
        return {
            watch: !this.options.production,
            mode: this.options.production ? 'production' : 'development',
            devtool: 'source-map',
            entry: this.getEntry(),
            output: this.getOutput(),
            plugins: this.getPlugins(),
            resolve: {
                plugins: [
                    new FractalModuleResolver({
                        fractal: fractal,
                    }),
                ],
                extensions: ['.tsx', '.jsx', '.ts', '.js'],
            },
            optimization: {
                splitChunks: {
                    automaticNameDelimiter: '.',
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            chunks: 'all',
                        },
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true
                        }
                    }
                }
            },
            module: {
                rules: [
                    {
                        test: /\.(ts|tsx)$/,
                        enforce: 'pre',
                        loader: 'tslint-loader'
                    },
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: require.resolve('react'),
                        use: [{
                            loader: 'expose-loader',
                            options: 'React'
                        }]
                    },
                    {
                        test: require.resolve('react-dom'),
                        use: [{
                            loader: 'expose-loader',
                            options: 'ReactDOM'
                        }]
                    },
                    {
                        test: /\.(css|scss)$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: [
                                        require('autoprefixer')()
                                    ]
                                }
                            },
                            {
                                loader: 'resolve-url-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-resources-loader',
                                options: {
                                    resources: [
                                        './src/patterns/core/variables.scss',
                                        './src/patterns/core/mixins.scss'
                                    ]
                                }
                            }
                        ],
                    },
                    {
                        test: /\.(svg)$/,
                        include: path.resolve(__dirname, 'src/patterns/components/icon/import/svg/'),
                        use: [{
                            loader: SvgStorePlugin.loader,
                            options: {
                                name: 'svg/icons.svg',
                                iconName: '[name]'
                            }
                        },
                            {
                                loader: 'svgo-loader',
                                options: {
                                    plugins: [
                                        {
                                            removeViewBox: false
                                        }
                                    ]
                                }
                            }]
                    },
                    {
                        test: /\.(woff|woff2)$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]'
                            }
                        }]
                    },
                    {
                        test: /\.(png|svg|jpg|gif)$/,
                        exclude: path.resolve(__dirname, 'src/patterns/components/icon/import/svg/'),
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[ext]'
                            }
                        }]
                    },
                ]
            },
            stats: {
                modules: false,
                children: false,
            },
        };
    }

}

/**
 * Export config
 */
module.exports = (env) => {
    return new gotoAndReact(env);
};
