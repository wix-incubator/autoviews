const path = require('path');

const stylableLoaders = [
    {
        loader: 'style-loader'
    },
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
                exportLocalsConvention: 'camelCase'
            }
        }
    },
    {
        loader: 'resolve-url-loader'
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true
        }
    }
];

module.exports = function() {
    return {
        name: 'custom-webpack-plugin',
        configureWebpack(config) {
            // NOTE: For injecting inside sandpack
            Object.assign(config.resolve.alias, {
                '@auto-views-core': path.resolve(__dirname, '../../core')
            });

            return {
                devtool: 'source-map',
                module: {
                    rules: [
                        {
                            resourceQuery: /^\?raw-loader/,
                            use: ['raw-loader'],
                            type: 'javascript/auto'
                        },
                        {
                            test: /\.st\.css$/,
                            use: stylableLoaders
                        },
                        {
                            test: /\.s[ac]ss$/i,
                            use: stylableLoaders
                        }
                    ]
                }
            };
        }
    };
};
