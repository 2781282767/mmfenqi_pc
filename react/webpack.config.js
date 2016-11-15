var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');
var publicPath = '/dist/'; //服务器路径

var plugins = [];

// if (process.argv.indexOf('-p') > -1) { //生产环境
//     plugins.push(new webpack.DefinePlugin({ //编译成生产版本
//         'process.env': {
//             NODE_ENV: JSON.stringify('production')
//         }
//     }));
//     publicPath = '/react-cnode/dist/';
//     path = __dirname + '/react-cnode/dist/';
// }
// plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false, drop_console: true}}));//代码压缩



 // plugins.push(new webpack.optimize.UglifyJsPlugin());//代码压缩
 plugins.push(
     new webpack.DefinePlugin({
     'process.env': {
         'NODE_ENV': JSON.stringify('production')
     }
 }));



 plugins.push(new webpack.optimize.DedupePlugin());
 plugins.push(new webpack.optimize.OccurenceOrderPlugin());

plugins.push(new ExtractTextPlugin('css/[name].css')); //css单独打包
plugins.push(new webpack.HotModuleReplacementPlugin());//热替换
plugins.push(new HtmlWebpackPlugin({
        filename: '../index.html', //生成的html存放路径，相对于 path
        template: './src/Template/index.html', //html模板路径
        hash: true,
        //为静态资源生成hash值
        chunks: ['index', 'vendors'],
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
        ]
    },
    output: {
        publicPath: publicPath, //编译好的文件，在服务器的路径
        path: path.join(__dirname, 'dist'), //编译到当前目录
        filename: '[name].js'
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
        "redux": "Redux",
        "react-redux": "ReactRedux",
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
            },

            //
            // {
            //     test: /\.(png|jpg)$/,
            //     exclude: /^node_modules$/,
            //     loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            // },


            {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=25000' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            },

            // {test: /\.(png|jpg)$/, exclude: /^node_modules$/,loader: 'base64-inline-loader'},


            {
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
};
