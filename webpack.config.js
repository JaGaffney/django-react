const path = require('path');

module.exports = {
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    entry: {
        index: './leadmanager/frontend/src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'leadmanager/frontend/static/frontend/')
    },
    optimization: { 
        splitChunks: {
            chunks: 'all',
        },
    }     
}