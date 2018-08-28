var webpack = require('webpack');
var path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

//入口目录文件夹
var srcEntrysDir = path.resolve(__dirname, '../src/apps');
//多个单页应用入口
var entrys = helpers.getEntry(srcEntrysDir + '/*/*.js');
//第三方库
var srcVendorsDir = path.resolve(__dirname, '../src/vendors');
entrys = Object.assign(entrys, helpers.getEntry(srcVendorsDir + "/**/*.js", 'vendors'));
// console.log("文件列表：" + JSON.stringify(entrys));
var srcComponentsDir = path.resolve(__dirname, '../src/components');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  devtool: 'source-map',
  //页面入口文件配置
  entry: entrys, 
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'), 'node_modules'
    ],
    alias: {  
      'menuUtils':srcEntrysDir + '/common/MenuUtils',
      // 'vue-router$': 'vue-router/dist/vue-router.js',
      // 'vue$': 'vue/dist/vue.js',
      'util': srcVendorsDir + '/util',
      'env': srcComponentsDir + '/sys/env', 
      'selectHospital': srcComponentsDir + '/selectHospital/selectHospital',
      'selectComplaintType': srcComponentsDir + '/selectComplaintType/selectComplaintType',
      'ue': srcComponentsDir + '/cueditor/ue'
    },
    extensions: ['.js', '.vue', '.less', '.css']
  },
  module: {
    loaders: [
      { //解析 .ejs
        test: /\.html$/,
        loader: 'ejs-loader'
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /vendors/,
        options: {
          presets: ['es2015'],
          plugins: [
            "syntax-dynamic-import",
            "transform-object-rest-spread",
            "transform-class-properties"
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          presets: ['es2015'],
          loaders: {
            js: 'babel-loader'
          }
        }
      },
      // {
      //   test: /\.html$|\.htm$|\.php$/,
      //   loader: 'html-loader'
      // },
      // {
      //   test: /\.html$|\.htm$/,
      //   loader: 'html-loader'
      // },
      {
        test: /\.css$|\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?minimize!postcss-loader!less-loader"
          // use: "css-loader!postcss-loader!less-loader"
        })
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Util: 'util',
      Env: 'env', 
      // Vue: 'vue',
      // VueRouter: 'vue-router'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors'],
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/externals'),
      to: path.resolve(__dirname, '../dist')
    }])
  ]
};