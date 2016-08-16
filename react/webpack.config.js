var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');
var publicPath = '/dist/'; //服务器路径

var plugins = [];
plugins.push(new ExtractTextPlugin('[name].css')); //css单独打包
plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new HtmlWebpackPlugin({
    filename: '../index.html', //生成的html存放路径，相对于path
    template: './src/template/index.html', //html模板路径
    hash: true,
        //为静态资源生成hash值
    chunks: 'index'
}));
module.exports = {
    entry: {
        index: [
            './src/index'
        ]
    },
    output: {
        publicPath: publicPath, //编译好的文件，在服务器的路径
        path: path.join(__dirname, 'dist'), //编译到当前目录
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['jsx?harmony', 'babel?presets[]=react,presets[]=es2015'],
            include: path.join(__dirname, 'src')
        }]
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx'], //后缀名自动补全
    },

    watch: true
};