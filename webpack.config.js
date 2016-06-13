'use strict';
var webpack = require('webpack');

module.exports = {
    entry: "./app/app.js",
    output: {
        filename: "buid.js"
    },

    plugins: [
        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ], ["normal", "loader"])
    ]
};