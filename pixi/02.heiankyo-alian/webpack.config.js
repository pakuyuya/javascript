const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist/js')
    },
    resolve: {
        modules: [
            "node_modules"
        ]
    }
}