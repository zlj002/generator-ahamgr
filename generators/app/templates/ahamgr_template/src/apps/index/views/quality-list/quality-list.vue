<template>
	<section>
		<!--工具条-->
		<el-col :span="24"
		    class="toolbar"
		    style="padding-bottom: 0px;">
			<el-form :inline="true"
			    :model="filters">
				<el-form-item>
					<el-input v-model="filters.acceptNo"
					    placeholder="受理单号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.productName"
					    placeholder="产品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.productSpec"
					    placeholder="产品规格"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.productNo"
					    placeholder="产品批号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-form-item label="产品质量">
						<el-select v-model="filters.qualityRelated"
						    placeholder="产品质量">
							<el-option label="全部"
							    value="">
							</el-option>
							<el-option label="是"
							    value="1">
							</el-option>
							<el-option label="否"
							    value="0">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form-item>
				<el-form-item>
					<SelectComplaintType ref="complaintType"
					    style="width: 100%;"
					    :isMultiple=false
					    v-model="filters.complaintTypeId"></SelectComplaintType>
				</el-form-item>
				<el-form-item>
					<el-date-picker type="date"
					    placeholder="受理日期开始时间"
					    value-format="yyyy-MM-dd"
					    v-model="filters.acceptDayStart"
					    style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-date-picker type="date"
					    placeholder="受理日期结束时间"
					    value-format="yyyy-MM-dd"
					    v-model="filters.acceptDayEnd"
					    style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-date-picker type="date"
					    placeholder="手术日期开始时间"
					    value-format="yyyy-MM-dd"
					    v-model="filters.operationDayStart"
					    style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-date-picker type="date"
					    placeholder="手术日期结束时间"
					    value-format="yyyy-MM-dd"
					    v-model="filters.operationDayEnd"
					    style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="">
					<SelectHospital ref="hospital"
					    style="width: 100%;"
					    v-model="filters.hospitalId"></SelectHospital>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"
					    v-on:click="getData">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"
					    @click="handleAdd"
					    v-show="checkBtn('customer:complaint:save')">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data"
		    highlight-current-row
		    v-loading="listLoading"
		    @selection-change="selsChange"
		    style="width: 100%;">
			<el-table-column type="selection"
			    width="55">
			</el-table-column>
			<el-table-column prop="acceptNo"
			    width="120"
			    label="受理单号">
			</el-table-column>
			<el-table-column prop="acceptDay"
			    label="受理日期"
			    width="120"
			    sortable>
			</el-table-column>
			<el-table-column prop="operationDay"
			    label="手术日期"
			    width="120"
			    sortable>
			</el-table-column>
			<!-- <el-table-column prop="name"
			    label="医院"
			    width="120"
			    sortable>
			</el-table-column> -->
			<el-table-column prop="productName"
			    label="产品名称"
			    width="120"
			    sortable>
			</el-table-column>
			<el-table-column prop="productSpec"
			    label="产品规格"
			    min-width="120"
			    sortable>
			</el-table-column>
			<el-table-column prop="productNo"
			    label="产品批号"
			    width="120"
			    sortable>
			</el-table-column>
			<!-- <el-table-column prop="validDay"
			    label="有效期"
			    width="120"
			    sortable>
			</el-table-column> -->
			<el-table-column label="操作"
			    width="220">
				<template slot-scope="scope">
					<el-button size="small"
					    @click="handleView(scope.$index, scope.row)"
					    v-show="checkBtn('customer:complaint:view')">查看</el-button>
					<el-button size="small"
					    @click="handleEdit(scope.$index, scope.row)"
					    v-show="checkBtn('customer:complaint:update')">编辑</el-button>
					<el-button type="danger"
					    size="small"
					    @click="handleDel(scope.$index, scope.row)"
					    v-show="checkBtn('customer:complaint:delete')">删除</el-button>
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
			    style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
// import util from '../../common/js/util'
//import NProgress from 'nprogress'
import SelectHospital from 'selectHospital'
import SelectComplaintType from 'selectComplaintType'
import { getComplaintListPage, editComplaint, deleteComplaint } from '../../../api/api';
import { checkBtns } from '../../../common/user';

export default {
	data() {
		return {
			btns: [],
			filters: {
				acceptNo: '',
				productName: '',
				acceptDayStart: '',
				acceptDayEnd: '',
				operationDayStart: '',
				operationDayEnd: '',
				productSpec: '',
				hospitalId: '',
				productNo: '',
				qualityRelated: '',
				complaintTypeId: ''
			},
			data: [],
			total: 0,
			page: 1,
			pageSize: 20,
			listLoading: false,
			sels: [],//列表选中列

			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			editFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm: {
				id: 0,
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			},

			addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
			//新增界面数据
			addForm: {
				name: '',
				sex: -1,
				age: 0,
				birth: '',
				addr: ''
			}

		}
	},
	components: {
		SelectHospital: SelectHospital,
		SelectComplaintType: SelectComplaintType
	},
	computed: {
		// 计算属性的 getter

	},
	methods: {
		checkBtn: function (code) {
			// `this` 指向 vm 实例
			return checkBtns('quality-list', code)
		},
		//性别显示转换
		formatSex: function (row, column) {
			return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getData();
		},
		//获取用户列表
		getData() {
			let para = {
				page: this.page - 1,
				acceptNo: this.filters.acceptNo,
				productName: this.filters.productName,
				acceptDayStart: this.filters.acceptDayStart,
				acceptDayEnd: this.filters.acceptDayEnd,
				operationDayStart: this.filters.operationDayStart,
				operationDayEnd: this.filters.operationDayEnd,
				hospitalId: this.filters.hospitalId,
				productSpec: this.filters.productSpec,
				productNo: this.filters.productNo,
				qualityRelated: this.filters.qualityRelated,
				complaintTypeId: this.filters.complaintTypeId
			};
			this.listLoading = true;
			//NProgress.start();
			getComplaintListPage(para).then((res) => {
				this.total = res.data.totalElements
				this.data = res.data.content
				this.listLoading = false;
				//NProgress.done();
			});
		},
		//删除
		handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				//NProgress.start();
				let para = { id: row.id };
				deleteComplaint(para).then((res) => {
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getData();
				});
			}).catch(() => {

			});
		},
		handleView: function (index, row) {
			this.$router.push({ path: '/customer/complaint/view/hidden', query: { id: row.id } });
		},
		//显示编辑界面
		handleEdit: function (index, row) {
			this.$router.push({ path: '/customer/complaint/add', query: { id: row.id } });
		},
		//显示新增界面
		handleAdd: function (item) {
			this.$router.push({ path: '/customer/complaint/add' });
		},
		//编辑
		editSubmit: function () {

		},
		//新增
		addSubmit: function () {

		},
		selsChange: function (sels) {
			this.sels = sels;
		},
		//批量删除
		batchRemove: function () {
			var ids = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				//NProgress.start();
				let para = { ids: ids };
				batchRemoveUser(para).then((res) => {
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getData();
				});
			}).catch(() => {

			});
		}
	},
	mounted() {
		var that = this
		that.getData();
	}
}

</script>

<style scoped>
</style>