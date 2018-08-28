// import Vue from 'vue'
// import Router from 'vue-router'
import Home from './views/home/home.vue'
import NotFound from './views/error/nofound.vue'
import Login from './views/login/login.vue'
// import QualityList from './views/quality-list/quality-list.vue'
// import QualityAdd from './views/quality-add/quality-add.vue'
// import HospitalList from './views/hospital-list/hospital-list.vue'
// import UserList from './views/user-list/user-list.vue'
// import RoleList from './views/role-list/role-list.vue'
// Vue.use(Router)
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '主页',
        code: 'home',
        hidden: true,
        iconCls: 'el-icon-message',//图标样式class
        children: [
            // { path: '/quality-list', component: QualityList, name: '反馈列表', code: 'customer:complaint:*' },
            // { path: '/quality-add', component: QualityAdd, name: '新增反馈', hidden: true }
        ]
    },
    // {
    //     path: '/sys',
    //     component: Home,
    //     name: '系统设置',
    //     code: "sys",
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/hospital-list', component: HospitalList, name: '医院管理', "code": "sys:hospital:*" },
    //         { path: '/sys/user/list', component: UserList, name: '用户管理', "code": "sys:user:*" },
    //         { path: '/role-list', component: RoleList, name: '角色管理', "code": "sys:role:*" }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];
export default new VueRouter({
    routes: routes
})
export let rawRoutes = routes