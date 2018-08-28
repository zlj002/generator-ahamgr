<template>
	<section>
		<!--工具条-->
		<el-col :span="24"
		    class="toolbar"
		    style="padding-bottom: 0px">
			<el-form :inline="true"
			    :model="filters">

				<el-form-item>
					<el-input v-model="filters.name"
					    placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"
					    v-on:click="getData">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"
					    @click="handleAdd"
					    v-show="checkBtn('sys:user:save')">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data"
		    highlight-current-row
		    v-loading="listLoading"
		    @selection-change="selsChange"
		    style="width: 100%">
			<el-table-column type="selection"
			    width="55">
			</el-table-column>
			<el-table-column prop="userName"
			    label="登录名"
			    width="120"
			    sortable>
			</el-table-column>
			<el-table-column prop="name"
			    label="姓名"
			    width="120"
			    sortable>
			</el-table-column>
			<el-table-column prop="email"
			    label="邮箱"
			    min-width="120"
			    sortable>
			</el-table-column>
			<el-table-column label="启用状态"
			    min-width="120"
			    sortable>
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status"
					    @click.native="swithUser(scope.row)"
					    active-color="#13ce66"
					    inactive-color="#ff4949">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作"
			    width="200">
				<template slot-scope="scope">
					<el-button size="small"
					    @click="handleEdit(scope.$index, scope.row)"
					    v-show="checkBtn('sys:user:update')">编辑</el-button>
					<el-button type="danger"
					    size="small"
					    @click="handleDel(scope.$index, scope.row)"
					    v-show="checkBtn('sys:user:delete')">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24"
		    class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next"
			    @current-change="handleCurrentChange"
			    :page-size="pageSize"
			    :total="total"
			    style="float:right">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑"
		    :visible.sync="editFormVisible"
		    :close-on-click-modal="false">
			<el-form :model="editForm"
			    label-width="80px"
			    :rules="editFormRules"
			    ref="editForm">
				<el-form-item label="登录名"
				    prop="userName">
					<el-input v-model="editForm.userName"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码"
				    prop="password">
					<el-input v-model="editForm.password"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名"
				    prop="name">
					<el-input v-model="editForm.name"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱"
				    prop="email">
					<el-input v-model="editForm.email"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色">
					<el-checkbox-group v-model="editForm.roleIds">
						<el-checkbox v-for="item in roles"
						    :key="item.id"
						    :label="item.id">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer"
			    class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary"
				    @click.native="editSubmit"
				    :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增"
		    :visible.sync="addFormVisible"
		    :close-on-click-modal="false">
			<el-form :model="addForm"
			    label-width="80px"
			    :rules="addFormRules"
			    ref="addForm">
				<el-form-item label="登录名"
				    prop="userName">
					<el-input v-model="addForm.userName"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码"
				    prop="password">
					<el-input v-model="addForm.password"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名"
				    prop="name">
					<el-input v-model="addForm.name"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱"
				    prop="email">
					<el-input v-model="addForm.email"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色">
					<el-checkbox-group v-model="addForm.roleIds">
						<el-checkbox v-for="item in roles"
						    :key="item.id"
						    :label="item.id">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer"
			    class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary"
				    @click.native="addSubmit"
				    :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import NProgress from 'nprogress'
import { enableUser, getUserListPage, deleteUser, batchRemoveUser, editUser, addUser, viewUser, getRoleAll } from '../../../api/api'
import { checkBtns } from '../../../common/user';
export default {
	data() {
		return {
			filters: {
				name: ''
			},
			data: [],
			total: 0,
			page: 1,
			pageSize: 20,
			roles: [],
			listLoading: false,
			sels: [],//列表选中列

			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			editFormRules: {
				userName: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				// password: [
				// 	{ required: true, message: '请输入密码', trigger: 'blur' }
				// ],
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm: {
				id: 0,
				userName: '',
				password: '',
				name: '',
				email: '',
				roleIds: []
			},

			addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				userName: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' }
				]
			},
			//新增界面数据
			addForm: {
				userName: '',
				password: '',
				name: '',
				email: '',
				roleIds: []
			}

		}
	},
	methods: {
		swithUser: function (user) {
			var _status = (user.status) ? 1 : 0
			enableUser({ id: user.id, status: _status }).then(() => {
				this.getData()
			})
		},
		checkBtn: function (code) {
			// `this` 指向 vm 实例
			return checkBtns('user-list', code)
		},
		//性别显示转换
		formatSex: function (row, column) {
			return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知'
		},
		handleCurrentChange(val) {
			this.page = val
			this.getData()
		},
		//获取用户列表
		getData() {
			let para = {
				page: this.page - 1,
				size: this.pageSize,
				name: this.filters.name
			}
			this.listLoading = true
			NProgress.start()
			getUserListPage(para).then((res) => {
				this.total = res.data.totalElements
				res.data.content.map((data) => {
					data.status = data.status ? true : false
				})
				this.data = res.data.content

				this.listLoading = false
				NProgress.done()
			})
		},
		//删除
		handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true
				//NProgress.start()
				let para = { id: row.id }
				deleteUser(para).then((res) => {
					this.listLoading = false
					//NProgress.done()
					this.$message({
						message: '删除成功',
						type: 'success'
					})
					this.getData()
				})
			}).catch(() => {

			})
		},
		//显示编辑界面
		handleEdit: function (index, row) {
			var para = {
				id: row.id
			}
			viewUser(para).then((res) => {
				this.editFormVisible = true
				this.editForm = Object.assign({}, res.data.user)
				return res.data.user.roleIds
			}).then((rules) => {
				this.editForm.roleIds = rules
			})
		},
		//显示新增界面
		handleAdd: function () {
			this.addFormVisible = true
			this.addForm = {
				name: '',
				userName: '',
				email: '',
				roleIds: []
			}
		},
		//编辑
		editSubmit: function () {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true
						NProgress.start()
						let para = Object.assign({}, this.editForm)
						para.roleIds = para.roleIds.join(',')
						editUser(para).then((res) => {
							this.editLoading = false
							NProgress.done()
							this.$message({
								message: '提交成功',
								type: 'success'
							})
							this.$refs['editForm'].resetFields()
							this.editFormVisible = false
							this.getData()
						})
					}, () => { })
				}
			})
		},
		//新增
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true
						NProgress.start()
						let para = Object.assign({}, this.addForm)
						para.roleIds = para.roleIds.join(',')
						addUser(para).then((res) => {
							this.addLoading = false
							NProgress.done()
							this.$message({
								message: '提交成功',
								type: 'success'
							})
							this.$refs['addForm'].resetFields()
							this.addFormVisible = false
							this.getData()
						})
					}, () => { })
				}
			})
		},
		selsChange: function (sels) {
			this.sels = sels
		},
		//批量删除
		batchRemove: function () {
			var ids = this.sels.map(item => item.id).toString()
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true
				//NProgress.start()
				let para = { ids: ids }
				batchRemoveUser(para).then((res) => {
					this.listLoading = false
					//NProgress.done()
					this.$message({
						message: '删除成功',
						type: 'success'
					})
					this.getData()
				})
			}).catch(() => {

			})
		}
	},
	mounted() {
		this.getData()
		getRoleAll().then((res) => {
			this.roles = res.data
		})
	}
}

</script>

<style scoped>
</style>