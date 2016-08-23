var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');
var publicPath = '/dist/'; //服务器路径

var plugins = [];
plugins.push(new ExtractTextPlugin('css/[name].css')); //css单独打包
plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new HtmlWebpackPlugin({ 
        filename: '../index.html', //生成的html存放路径，相对于 path
        template: './src/template/index.html', //html模板路径
        hash: true,
            //为静态资源生成hash值
        chunks: ['index', 'vendors'],
        inject: 'body'
    }),

    new HtmlWebpackPlugin({
        filename: '../app.html', //生成的html存放路径，相对于 path
        template: './src/template/app.html', //html模板路径 
        hash: true,
            //为静态资源生成hash值
        chunks: ['app', 'vendors'],
        inject: 'body'
    })

);

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk chunks: chunks, minChunks: chunks.length // 提取所有entry共同依赖的模块 }),
    minChunks: Infinity
}));
module.exports = {
    entry: {
        index: [
            './src/index'
        ],
        app: [
            './src/app'
        ]
    },
    output: {
        publicPath: publicPath, //编译好的文件，在服务器的路径
        path: path.join(__dirname, 'dist'), //编译到当前目录
        filename: '[name].js'
    },
    module: {
        loaders: [

            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel?presets=es2015'
            }, {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            }, {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=20000&name=../images/[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['jsx?harmony', 'babel?presets[]=react,presets[]=es2015'],
                include: path.join(__dirname, 'src')
            }
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx'], //后缀名自动补全
    },
    watch: true
};