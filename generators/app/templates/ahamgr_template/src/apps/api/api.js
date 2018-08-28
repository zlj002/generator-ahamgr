import axios from 'axios'
import qs from 'qs'
let base = Env.apiHost
var instance = axios.create({
    baseURL: base,
    timeout: 0,
    withCredentials: true
})
instance.interceptors.request.use(config => {
    return config
}, err => {
    vueInstance.$message.error({ message: '请求超时!' })
    return Promise.resolve(err)
})
instance.interceptors.response.use(data => {
    if (data.status && data.status == 200 && data.data.code != '0000') {
        if (data.data.code === '0007') {
            vueInstance.$message.error({ message: data.message })
            location.href = '/index.html#/login'
            return data
        }
        vueInstance.$message.error({ message: data.data.message })
        return data
    }
    return data
}, err => {
    if (!err.response) {
        var _message = '请检查网络!'
        vueInstance.$message.error({ message: _message })
        err.message = _message
    } else if (err.response.status == 504 || err.response.status == 404) {
        vueInstance.$message.error({ message: '服务器被吃了⊙﹏⊙∥' })
    } else if (err.response.status == 403) {
        vueInstance.$message.error({ message: '权限不足,请联系管理员!' })
    } else {
        vueInstance.$message.error({ message: '未知错误!' })
    }
    err.data = err
    return Promise.resolve(err)
})


export const requestLogin = params => {
    return instance.post(`${base}/login`, qs.stringify(params)).then(res => res.data)
}

export const getUserList = params => { return instance.get(`${base}/user/list`, { params: params }) }
//用户分页
export const getUserListPage = params => { return instance.get(`${base}/sys/user/list`, { params: params }).then(res => res.data) }
//编辑用户
export const editUser = params => { return instance.post(`${base}/sys/user/update`, qs.stringify(params)).then(res => res.data) }
//开启关闭用户
export const enableUser = params => { return instance.post(`${base}/sys/user/enable`, qs.stringify(params)).then(res => res.data) }
//新增用户
export const addUser = params => { return instance.post(`${base}/sys/user/save`, qs.stringify(params)).then(res => res.data) }
//删除用户
export const deleteUser = params => { return instance.post(`${base}/sys/user/delete`, qs.stringify(params)).then(res => res.data) }
//查看用户
export const viewUser = params => { return instance.get(`${base}/sys/user/view`, { params: params }).then(res => res.data) }
//角色分页
export const getRoleListPage = params => { return instance.get(`${base}/sys/role/list`, { params: params }).then(res => res.data) }
//编辑角色
export const editRole = params => { return instance.post(`${base}/sys/role/update`, qs.stringify(params)).then(res => res.data) }
//查看角色
export const viewRole = params => { return instance.get(`${base}/sys/role/view`, { params: params }).then(res => res.data) }
//新增角色
export const addRole = params => { return instance.post(`${base}/sys/role/save`, qs.stringify(params)).then(res => res.data) }
//删除角色
export const deleteRole = params => { return instance.post(`${base}/sys/role/delete`, qs.stringify(params)).then(res => res.data) }
//获取所有
export const getRoleAll = params => { return instance.get(`${base}/sys/role/findAll`, { params: params }).then(res => res.data) }
//投诉列表
export const getComplaintListPage = params => { return instance.get(`${base}/customer/complaint/list`, { params: params }).then(res => res.data) }
//编辑投诉
export const editComplaint = params => { return instance.post(`${base}/customer/complaint/update`, params).then(res => res.data) }
//查看投诉你
export const viewComplaint = params => { return instance.get(`${base}/customer/complaint/view`, { params: params }).then(res => res.data) }
//新增投诉 
export const addComplaint = params => { return instance.post(`${base}/customer/complaint/save`, params).then(res => res.data) }
//删除投诉
export const deleteComplaint = params => { return instance.post(`${base}/customer/complaint/delete`, qs.stringify(params)).then(res => res.data) }



export const batchRemoveUser = params => { return instance.get(`${base}/user/batchremove`, { params: params }) }


//医院列表
export const getHospitalListPage = params => { return instance.get(`${base}/sys/hospital/list`, { params: params }).then(res => res.data) }
//根据名称搜索医院
export const findHospitalByNameLike = params => { return instance.get(`${base}/sys/hospital/findByNameLike`, { params: params }).then(res => res.data) }
//新增医院
export const addHospital = params => { return instance.post(`${base}/sys/hospital/save`, qs.stringify(params)).then(res => res.data) }
//修改医院
export const editHospital = params => { return instance.post(`${base}/sys/hospital/update`, qs.stringify(params)).then(res => res.data) }
//删除医院
export const deleteHospital = params => { return instance.post(`${base}/sys/hospital/delete`, qs.stringify(params)).then(res => res.data) }

//投诉类型列表
export const getComplaintTypeListPage = params => { return instance.get(`${base}/sys/complaintType/list`, { params: params }).then(res => res.data) }
//根据投诉类型名称搜索医院
export const findComplaintTypeByNameLike = params => { return instance.get(`${base}/sys/complaintType/findByNameLike`, { params: params }).then(res => res.data) }
//新增投诉类型
export const addComplaintType = params => { return instance.post(`${base}/sys/complaintType/save`, qs.stringify(params)).then(res => res.data) }
//修改投诉类型
export const editComplaintType = params => { return instance.post(`${base}/sys/complaintType/update`, qs.stringify(params)).then(res => res.data) }
//删除投诉类型
export const deleteComplaintType = params => { return instance.post(`${base}/sys/complaintType/delete`, qs.stringify(params)).then(res => res.data) }

//上传文件
export const uploadFile = params => { return instance.post(`${base}/file/upload`, params).then(res => res.data) }
//下载文件
export const downloadFile = params => { return instance.get(`${base}/file/download`, { params: params }).then(res => res.data) }
//所有菜单
export const getPermissionAll = params => { return instance.get(`${base}/sys/permission/findAll`, { params: params }).then(res => res.data) }