const path = require('path');

module.exports = function() {
    return {
        name: 'custom-webpack-plugin',
        configureWebpack(config) {
            // NOTE: For injecting inside sandpack
            Object.assign(config.resolve.alias, {
                '@core': path.resolve(__dirname, '../../core')
            });

            return {
                devtool: 'source-map',
                module: {
                    rules: [
                        {
                            resourceQuery: /^\?raw-loader/,
                            use: ['raw-loader'],
                            type: 'javascript/auto'
                        }
                    ]
                }
            };
        }
    };
};
