import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://gitee.com/uploads/46/124746_lorinzhang.png?1464675006',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}
const UserPermission = [
  {
    "id": 1,
    "parentId": null,
    "name": "系统设置",
    "code": "sys",
    "iconCls": "el-icon-message",
    "viewName": "home",
    "level": 1,
    "url": null,
    "checked": false,
    "children": [
      {
        "id": 18,
        "parentId": 1,
        "name": "角色管理",
        "code": "sys:role",
        "iconCls": "el-icon-message",
        "viewName": "role-list",
        "level": 2,
        "url": "/sys/role/list",
        "checked": false,
        "children": [
          {
            "id": 19,
            "parentId": 18,
            "name": "添加角色",
            "code": "sys:role:save",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/role/save",
            "checked": false,
            "children": []
          },
          {
            "id": 20,
            "parentId": 18,
            "name": "删除角色",
            "code": "sys:role:delete",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/role/delete",
            "checked": false,
            "children": []
          },
          {
            "id": 21,
            "parentId": 18,
            "name": "修改角色",
            "code": "sys:role:update",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/role/update",
            "checked": false,
            "children": []
          },
          {
            "id": 22,
            "parentId": 18,
            "name": "查看角色",
            "code": "sys:role:view",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/role/view",
            "checked": false,
            "children": []
          }
        ]
      },
      {
        "id": 2,
        "parentId": 1,
        "name": "医院管理",
        "code": "sys:hospital",
        "iconCls": "el-icon-message",
        "viewName": "hospital-list",
        "level": 2,
        "url": "/sys/hospital/list",
        "checked": false,
        "children": [
          {
            "id": 3,
            "parentId": 2,
            "name": "添加医院",
            "code": "sys:hospital:save",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/hospital/save",
            "checked": false,
            "children": []
          },
          {
            "id": 4,
            "parentId": 2,
            "name": "删除医院",
            "code": "sys:hospital:delete",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/hospital/delete",
            "checked": false,
            "children": []
          },
          {
            "id": 5,
            "parentId": 2,
            "name": "修改医院",
            "code": "sys:hospital:update",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/hospital/update",
            "checked": false,
            "children": []
          },
          {
            "id": 6,
            "parentId": 2,
            "name": "查看医院",
            "code": "sys:hospital:view",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/hospital/view",
            "checked": false,
            "children": []
          }
        ]
      },
      {
        "id": 7,
        "parentId": 1,
        "name": "投诉类型",
        "code": "sys:complaintType",
        "iconCls": "el-icon-message",
        "viewName": "complaintType-list",
        "level": 2,
        "url": "/sys/complaintType/list",
        "checked": false,
        "children": [
          {
            "id": 8,
            "parentId": 7,
            "name": "添加投诉类型",
            "code": "sys:complaintType:save",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/complaintType/save",
            "checked": false,
            "children": []
          },
          {
            "id": 9,
            "parentId": 7,
            "name": "删除投诉类型",
            "code": "sys:complaintType:delete",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/complaintType/delete",
            "checked": false,
            "children": []
          },
          {
            "id": 10,
            "parentId": 7,
            "name": "修改投诉类型",
            "code": "sys:complaintType:update",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/complaintType/update",
            "checked": false,
            "children": []
          },
          {
            "id": 11,
            "parentId": 7,
            "name": "查看投诉类型",
            "code": "sys:complaintType:view",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/complaintType/view",
            "checked": false,
            "children": []
          }
        ]
      },
      {
        "id": 12,
        "parentId": 1,
        "name": "用户管理",
        "code": "sys:user",
        "iconCls": "el-icon-message",
        "viewName": "user-list",
        "level": 2,
        "url": "/sys/user/list",
        "checked": false,
        "children": [
          {
            "id": 13,
            "parentId": 12,
            "name": "添加用户",
            "code": "sys:user:save",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/user/save",
            "checked": false,
            "children": []
          },
          {
            "id": 14,
            "parentId": 12,
            "name": "删除用户",
            "code": "sys:user:delete",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/user/delete",
            "checked": false,
            "children": []
          },
          {
            "id": 15,
            "parentId": 12,
            "name": "修改用户",
            "code": "sys:user:update",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/user/update",
            "checked": false,
            "children": []
          },
          {
            "id": 16,
            "parentId": 12,
            "name": "查看用户",
            "code": "sys:user:view",
            "iconCls": "el-icon-message",
            "viewName": null,
            "level": 3,
            "url": "/sys/user/view",
            "checked": false,
            "children": []
          }
        ]
      }
    ]
  },
  {
    "id": 23,
    "parentId": null,
    "name": "反馈管理",
    "code": "customer",
    "iconCls": "el-icon-message",
    "viewName": "home",
    "level": 1,
    "url": null,
    "checked": false,
    "children": [
      {
        "id": 24,
        "parentId": 23,
        "name": "反馈列表",
        "code": "customer:complaint",
        "iconCls": "el-icon-message",
        "viewName": "quality-list",
        "level": 2,
        "url": "/customer/complaint/list",
        "checked": false,
        "children": [
          
          // {
          //   "id": 27,
          //   "parentId": 24,
          //   "name": "删除反馈",
          //   "code": "customer:complaint:delete",
          //   "iconCls": "el-icon-message",
          //   "viewName": null,
          //   "level": 3,
          //   "url": "/customer/complaint/delete",
          //   "checked": false,
          //   "children": []
          // },
          // {
          //   "id": 28,
          //   "parentId": 24,
          //   "name": "修改反馈",
          //   "code": "customer:complaint:update",
          //   "iconCls": "el-icon-message",
          //   "viewName": null,
          //   "level": 3,
          //   "url": "/customer/complaint/update",
          //   "checked": false,
          //   "children": []
          // },
          // {
          //   "id": 29,
          //   "parentId": 24,
          //   "name": "查看反馈",
          //   "code": "customer:complaint:view",
          //   "iconCls": "el-icon-message",
          //   "viewName": null,
          //   "level": 3,
          //   "url": "/customer/complaint/view",
          //   "checked": false,
          //   "children": []
          // }
        ]
      },
      {
        "id": 25,
        "parentId": 23,
        "name": "新增反馈",
        "code": "customer:complaint:add",
        "iconCls": "el-icon-message",
        "viewName": "quality-add",
        "level": 2,
        "url": "/customer/complaint/save",
        "checked": false,
        "children": []
      }
    ]
  }
]
export { LoginUsers, Users, UserPermission };
