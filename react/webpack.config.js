var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包

var publicPath = '/dist/'; //服务器路径

var plugins = [];
plugins.push(new ExtractTextPlugin('[name].css')); //css单独打包
plugins.push( new webpack.HotModuleReplacementPlugin());
module.exports = {
    entry: {
        index: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src/index'
        ]
    },
    output: {
        publicPath:publicPath, //编译好的文件，在服务器的路径
        path:path.join(__dirname, 'dist'), //编译到当前目录
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot','jsx?harmony','babel?presets[]=react,presets[]=es2015'],
            include: path.join(__dirname, 'src')
        }]
        // loaders: [
        //     // {
        //     //     test: /\.jsx$/,
        //     //     exclude: /^node_modules$/,
        //     //     loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
        //     // }
        //
        // ]
    },
    plugins:plugins,
    resolve: {
        extensions: ['', '.js', '.jsx'], //后缀名自动补全
    },

    watch: true
};
