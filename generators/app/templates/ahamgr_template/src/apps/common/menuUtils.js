import lazyLoading from './lazyLoading'
// export default (appname, routers, data) => {
//   //这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
//   //所以这里要做一些转换
//   generaMenu(appname, routers, data)
// }
var parentDom = null
function formatMenu(data) {
  if (data) {
    data.forEach((item, index) => {
      var _item = Object.assign({}, item)

      if (_item.level == 1) {
        parentDom = data[index]
      }
      if (_item.viewName && _item.level == 3 && parentDom) {
        _item.level = 2
        _item.code = _item.code + "/hidden"
        _item.hidden = true
        parentDom.children.push(_item)
      }
      if (item.children && item.children.length > 0) {
        formatMenu(item.children)
      }
    })
  }
}
var formated = false
function generaMenu(appname, routers, data) {
  if (!formated) {
    formatMenu(data)
    formated = true
  }
  if (data) {
    data.forEach((item) => {
      let menu = Object.assign({}, item)
      menu.path = '/' + menu.code.replace(new RegExp(':', 'g'), '/');
      menu.component = lazyLoading(appname, menu.viewName)
      if (menu.children && menu.children.length > 0) {
        menu.children = []
        generaMenu(appname, menu.children, item.children)
      }
      routers.push(menu)
    })
  }
}
export default generaMenu