var webpack = require('webpack');
var path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');
var commonConfig = require('./webpack.common.js');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var outpath = path.resolve(__dirname, '../dist');
var webpackConfig = {
    devtool: 'cheap-module-source-map',
    //文件输出配置
    output: {
        path: outpath,
        filename: 'assets/js/[name].[chunkhash:8].min.js',
        chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.min.js',
        hotUpdateChunkFilename: 'assets/js/[id].[chunkhash:8].min.js',
        publicPath: '/'
    }
}
webpackConfig = Object.assign(commonConfig, webpackConfig);
console.log("prod文件列表：" + JSON.stringify(webpackConfig.entry));
webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendors'],
    minChunks: Infinity
}));
webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
})); 
webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function () {
                return [precss, autoprefixer({
                    browers: ['last 2 versions', 'ie >= 9', '> 5% in CN']
                })];
                // return [px2rem({
                //     remUnit: 75
                // }), autoprefixer({
                //     browers: ['last 2 versions', 'ie >= 9', '> 5% in CN']
                // })];
            },
            htmlLoader: {
                ignoreCustomFragments: [/\{\{.*?}}/],
                root: path.resolve(__dirname, 'src'),
                attrs: ['img:src', 'link:href']
            }
        }
    })
)
webpackConfig.plugins.push(
    new UglifyJsPlugin({ //压缩代码
        mangle: false,
        beautify: false,
        // beautify: true,
        // 删除所有的注释
        comments: false,
        compress: {
            warnings: false
        },
        except: ['$super', '$', 'exports', 'require', '$mount', 'import', 'from'] //排除关键字
    }))
//输出css配置
webpackConfig.plugins.push(new ExtractTextPlugin('assets/css/[name].[chunkhash:8].css'));
//输出字体文件
webpackConfig.module.loaders.push({
    test: /\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9]+)?$/,
    loader: 'url-loader?limit=10240&name=assets/font/[name].[hash:8].[ext]'
});
//输出图片
webpackConfig.module.loaders.push({
    test: /\.(png|jpg|gif)(\?[a-z0-9]+)?$/,
    loader: 'url-loader?limit=10240&name=assets/img/[name].[hash:8].[ext]'
});
webpackConfig.module.loaders.push({
    test: /\.(swf)(\?[a-z0-9]+)?$/,
    loader: 'url-loader?name=assets/swf/[name].[ext]'
});
var appPageDir = path.resolve(__dirname, '../src/apps');
var pages = Object.keys(helpers.getEntry(appPageDir + '/*/*.html'));
pages.forEach(function (pathname) {
    console.log("模板文件" + pathname);
    var conf = {
        filename: pathname + '.html', //生成的html存放路径，相对于path
        template: appPageDir + '/' + pathname + '/' + pathname + '.html', //html模板路径
        inject: false, //js插入的位置，true/'head'/'body'/false
        publicPath: webpackConfig.output.publicPath,
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    };
    if (pathname in webpackConfig.entry) {
        conf.inject = 'body';
        if (pathname == "resultimage") {
            conf.inject = 'head';
        }
        conf.chunks = ['vendors', pathname];
        // conf.chunksSortMode = 'dependency';
        conf.chunksSortMode = function (chunk1, chunk2) {
            var orders = conf.chunks;
            var order1 = orders.indexOf(chunk1.names[0]);
            var order2 = orders.indexOf(chunk2.names[0]);
            if (order1 > order2) {
                return 1;
            } else if (order1 < order2) {
                return -1;
            } else {
                return 0;
            }
        }
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});
module.exports = webpackConfig;