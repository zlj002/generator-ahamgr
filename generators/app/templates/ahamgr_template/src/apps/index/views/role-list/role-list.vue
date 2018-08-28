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
					    placeholder="角色名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"
					    v-on:click="getData">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"
					    @click="handleAdd"
						v-show="checkBtn('sys:role:save')">新增</el-button>
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

			<el-table-column prop="name"
			    label="角色名称"
			    width="120"
			    sortable>
			</el-table-column>
			<el-table-column prop="description"
			    label="角色描述"
			    width="200"
			    sortable>
			</el-table-column>
			<el-table-column label="操作"
			    width="150">
				<template slot-scope="scope">
					<el-button size="small"
					    @click="handleEdit(scope.$index, scope.row)"
						v-show="checkBtn('sys:role:update')">编辑</el-button>
					<el-button type="danger"
					    size="small"
					    @click="handleDel(scope.$index, scope.row)"
						v-show="checkBtn('sys:role:delete')">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24"
		    class="toolbar">
			<!-- <el-button type="danger"
			    @click="batchRemove"
			    :disabled="this.sels.length===0">批量删除</el-button> -->
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
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="editForm.name"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述"  prop="description">
					<el-input v-model="editForm.description"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限">
					<el-tree :data="permissions"
					    :props="defaultProps"
					    show-checkbox
					    node-key="id"
					    ref="treeEdit"
						:check-strictly="checkStrictly"
					    :expand-on-click-node="false">
					</el-tree>
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
				<el-form-item label="角色名"
				    prop="name">
					<el-input v-model="addForm.name"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="addForm.description"
					    auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限">
					<el-tree :data="permissions"
					    :props="defaultProps"
					    show-checkbox
					    node-key="id"
					    ref="treeAdd"
					    :expand-on-click-node="false"
					    v-model="addForm.permissionIds">
					</el-tree>
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
import { getRoleListPage, getPermissionAll, deleteRole, batchRemoveUser, editUser, viewRole, editRole, addRole } from '../../../api/api'
import { checkBtns } from '../../../common/user';
export default {
	data() {
		return {
			permissions: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			checkStrictly:true,
			checkedPermissions: [],
			filters: {
				name: ''
			},
			data: [],
			total: 0,
			page: 1,
			pageSize:20,
			listLoading: false,
			sels: [],//列表选中列

			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			editFormRules: {
				name: [
					{ required: true, message: '请输入角色名称', trigger: 'blur' }
				],
				description: [
					{ required: true, message: '请输入角色描述', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm: {
				id: 0,
				name: '',
				permissionIds: [],
				description:''
			},
			addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				name: [
					{ required: true, message: '请输入角色名称', trigger: 'blur' }
				],
				description: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
			//新增界面数据
			addForm: {
				name: '',
				permissionIds: [],
				description:''
			}

		}
	},
	methods: {
		checkBtn: function (code) {
			// `this` 指向 vm 实例
			return checkBtns('role-list', code)
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
				page: this.page-1,
				size:this.pageSize
			}
			if (this.filters.name) {
				para = Object.assign({
					name: this.filters.name
				}, para)
			}
			this.listLoading = true
			NProgress.start()
			getRoleListPage(para).then((res) => {
				this.total = res.data.totalElements
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
				NProgress.start()
				let para = { id: row.id }
				deleteRole(para).then((res) => {
					this.listLoading = false
					NProgress.done()
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
			this.editFormVisible = true
			this.editForm = Object.assign({}, row)
			var para = {
				id: this.editForm.id
			}
			viewRole(para).then((res) => {
				return res.data.permissionIds
			}).then((permissions) => {
				this.checkStrictly=true
				this.$refs.treeEdit.setCheckedKeys(permissions,false)
				this.checkStrictly=false
			})
			
		},
		//显示新增界面
		handleAdd: function () {
			this.addFormVisible = true
			this.addForm = {
				name: '',
				permissionIds: []
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
						var checked = this.$refs.treeEdit.getCheckedKeys()
						var halfChecked = this.$refs.treeEdit.getHalfCheckedKeys()
						para.permissionIds = checked.concat(halfChecked).join(',')
						editRole(para).then((res) => {
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
						var checked = this.$refs.treeAdd.getCheckedKeys()
						var halfChecked = this.$refs.treeAdd.getHalfCheckedKeys()
						para.permissionIds = checked.concat(halfChecked).join(',')
						addRole(para).then((res) => {
							this.addLoading = false
							NProgress.done()
							this.$message({
								message: res.message,
								type: res.code=='0000'?'success':'error'
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
		getPermissionAll().then((res) => {
			this.permissions = res.data
		})
	}
}

</script>

<style scoped>
</style>