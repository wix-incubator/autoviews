module.exports = function () {
    return {
        name: 'custom-webpack-plugin',
        configureWebpack() {
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
