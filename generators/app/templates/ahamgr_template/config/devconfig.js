/**
 * 开发过程中需要排除的页面，为了优化打包速度，可以只编译自己的页面，把不需要的页面写到下面即可
 */
var devconfig = {
    excludes: [ 
        'debug',
        // 'loadingpage',
    ]
}
module.exports = devconfig;