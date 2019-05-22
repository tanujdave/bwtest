module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        library: 'ShapeAreaCalculator',
        libraryTarget: 'umd',
        libraryExport: 'default',
        filename: 'shape-area-calculator.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }]
    }
};
