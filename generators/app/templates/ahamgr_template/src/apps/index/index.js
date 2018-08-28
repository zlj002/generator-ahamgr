 
import 'font-awesome/css/font-awesome.min.css'
import './index.less'
import router from './routes'
import App from './App.vue'
var MenuUtils = require('menuUtils').default 
let data = JSON.parse(window.sessionStorage.getItem('userPermission'))
if (data) {
  //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
  let routes = []
  MenuUtils('index',routes, data)
  router.options.routes  = router.options.routes;
  router.options.routes = router.options.routes.concat(routes)
  router.addRoutes(routes)
}
router.beforeEach((route, redirect, next) => {
  let data = JSON.parse(window.sessionStorage.getItem('userPermission'))
  if (data && route.path === '/login') {
    //这里不使用router进行跳转，是因为，跳转到登录页面的时候，是需要重新登录，获取数据的，这个时候，会再次向router实例里面add路由规则，
    //而next()跳转过去之后，没有刷新页面，之前的规则还是存在的，但是使用location的话，可以刷新页面，当刷新页面的时候，整个app会重新加载
    //而我们在刷新之前已经把sessionStorage里的user移除了，所以上面的添加路由也不行执行
    window.sessionStorage.removeItem('userPermission')
    window.location.href = '/'
    return false
  }
  if (!data && route.path !== '/login') {
    next({ path: '/login' })
  } else {
    if (route.path) {
      next()
    } else {
      next({ path: '/nofound' })
    }
  }
})
/* eslint-disable no-new */
var vueInstance = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
window.vueInstance = vueInstance