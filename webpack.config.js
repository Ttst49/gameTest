const path = require('path');

module.exports = {
    entry: ['./javascript/main.js',"./javascript/kaboom.js"],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};