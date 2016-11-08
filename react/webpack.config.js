var webpack = require('webpack');
var path = require('path');
var fs=require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var publicPath = '/dist/'; //服务器路径

var app_config = require('./config');

//模板位置
var viewPath = path.resolve(__dirname,app_config.pathToBuild,app_config.viewPath);

//页面主控制目录
var controllerSrc = path.resolve(__dirname,app_config.pathToBuild, app_config.controllerPath);

var plugins = [];
plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));//代码压缩
plugins.push(new ExtractTextPlugin('css/[name].css')); //css单独打包
plugins.push(new webpack.HotModuleReplacementPlugin());//热替换

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk chunks: chunks, minChunks: chunks.length // 提取所有entry共同依赖的模块 }),
    minChunks: Infinity
}));

/**
 * 读取配置文件
 */
var filepath = (function(){
    var files_names= {};
    var regtsx = /(.*).jsx/;
    var fileNames = fs.readdirSync(controllerSrc, function(err, files){
        if(err){console.log(err);return false;};
        return files
    });

    console.log(fileNames)

    fileNames.forEach(function(v){
        var tsx = v.match(regtsx);
        if(tsx){
            if(!files_names[tsx]){
                files_names[tsx[1]] = tsx[1];
            }
        }
    });
    return files_names;
})();

var _entry = function(options){
    var entry = {};
    for (var name in options) {

        console.log(titleCase3(name)+'Container');
        entry[titleCase3(name)+'Container'] = controllerSrc+'/'+options[name];
    }
    return entry;
}

console.log(_entry(filepath))
module.exports = {
    entry:_entry(filepath),
    output: {
        // publicPath: publicPath, //编译好的文件，在服务器的路径
        // path: path.join(__dirname, 'dist'), //编译到当前目录
        // filename: '[name].js'

        path: path.resolve(__dirname,app_config.pathToBuild,app_config.output),
        chunkFilename: '[name].js',
        filename:   '[name].js',
        publicPath: '/' + app_config.output + '/'
    },
    // devtool: 'source-map',
    module: {
        loaders: [

            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel',
                query:{compact:false}
            }, {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            }, {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            }, {
                test: /\.scss/,
                exclude: /^node_modules$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
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
        extensions: ['', '.js', '.jsx'] //后缀名自动补全
    },
    watch: true
};





var fileNames = fs.readdirSync(viewPath, function(err, files){
    if(err){console.log(err);return false;};
    return files;
});

/**
 * 将字符串首字母大写
 * @param
 * @returns {string}
 */
function titleCase3(s) {
    return s.toLowerCase().split(/\s+/).map(function(item, index) {
        return item.slice(0, 1).toUpperCase() + item.slice(1);
    }).join(' ');
}
/**
 * 动态插入多页模板
 */
fileNames.forEach(function(v){
    var regtsx = /(?:\w*)(?=.html)/;
    /**
     如果不已ejs 结尾的不处理
     **/
    if(v.match(regtsx)){

        console.log(v.match(regtsx)[0])

        console.log('进来了')
        var chunksContainer = titleCase3(v.match(regtsx)[0]) + 'Container';
        console.log(chunksContainer)

        console.log(viewPath)
        var htmlConfig = {
            template: viewPath +'/'+ v,
            //输出html的文件名，依赖于输出环境目录下
            filename:path.resolve(__dirname,app_config.pathToBuild,app_config.htmlFileName) + '/' + (v.match(regtsx)[0]) +'.html',
            chunks:['vendors',chunksContainer],
            hash:true,
            inject: 'body'
        };

        plugins.push(new HtmlWebpackPlugin(htmlConfig));
    }

});