/**
 * 这是一个自定义webpack插件固定格式
 * @param {*} options 
 */
function HWPSPlugin(options) {
  // Configure your plugin with options...

  this.options = Object.assign({
    injectHead: []
  }, options);
}

HWPSPlugin.prototype.apply = function (compiler) {
  // ...
  var that = this;
  compiler.plugin('compilation', function (compilation) {
    // console.log('The compiler is starting a new compilation...');
    compilation.plugin('chunk-hash', function(chunk, chunkHash) {
      console.log("hash"+JSON.stringify(chunkHash));
    });
    compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
      // htmlPluginData.html += 'The magic footer';
      var injects = that.options.injectHead;
      if (injects.length > 0) {
        for (var i = 0; i < injects.length; i++) {
          var _item = injects[i];
          htmlPluginData.html = htmlPluginData.html.replace('</head>', _item + '</head>');
        }
      } 
      callback(null, htmlPluginData);
    });
  });

};

module.exports = HWPSPlugin;