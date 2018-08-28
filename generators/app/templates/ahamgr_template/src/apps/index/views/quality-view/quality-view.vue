<template>
	<el-form ref="form"
	    :model="form"
	    :rules="rules"
	    label-width="80px">
		<fieldset>
			<legend>投诉产品信息</legend>
			<el-row>
				<el-col :span="12">
					<el-form-item label="受理单号"
					    prop="acceptNo">
						<!-- <el-input v-model="form.acceptNo" :disabled="true"></el-input> -->
						<span v-text="form.acceptNo"></span>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="受理日期"
					    prop="acceptDay">
						<!-- <el-date-picker type="date"
						    placeholder="选择日期"
						    value-format="yyyy-MM-dd"
						    v-model="form.acceptDay"
						    style="width: 100%;" :disabled="true"></el-date-picker> -->
						<span v-text="form.acceptDay"></span>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="手术日期"
					    prop="operationDay">
						<!-- <el-date-picker type="date"
						    placeholder="选择日期"
						    value-format="yyyy-MM-dd"
						    v-model="form.operationDay"
						    style="width: 100%;"></el-date-picker> -->
						<span v-text="form.operationDay"></span>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="医院"
					    prop="hospitalId">
						<!-- 	<SelectHospital ref="hospital"
						    style="width: 100%;"
						    v-model="hospitalId"></SelectHospital> -->
						<span v-text="form.hospital && form.hospital.name"></span>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="产品名称"
					    prop="productName">
						<!-- <el-input v-model="form.productName"></el-input> -->
						<span v-text="form.productName"></span>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="产品规格"
					    prop="productSpec">
						<!-- <el-input v-model="form.productSpec"></el-input> -->
						<span v-text="form.productSpec"></span>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="产品批号"
					    prop="productNo">
						<!-- <el-input v-model="form.productNo"></el-input> -->
						<span v-text="form.productNo"></span>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="有效期"
					    prop="validDay">
						<!-- <el-date-picker type="date"
						    placeholder="选择日期"
						    value-format="yyyy-MM-dd"
						    v-model="form.validDay"
						    style="width: 100%;"></el-date-picker> -->
						<span v-text="form.validDay"></span>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="投诉类型"
					    prop="complaintTypeId">
						<!-- <SelectComplaintType ref="complaintType"
						    style="width: 100%;"
						    v-model="complaintTypeId"></SelectComplaintType> -->
						<span v-for="(item,index) in form.complaintTypes"
						    v-if="form.complaintTypes && form.complaintTypes.length>0 && index<form.complaintTypes.length-1">
							{{item.name +','}}
						</span>
						<span v-if="form.complaintTypes && form.complaintTypes.length>0">
							{{form.complaintTypes[form.complaintTypes.length-1].name}}
						</span>
						<!-- <span v-text="form.complaintType && form.complaintType.name"></span> -->
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="质量问题">
						<span v-text="form.qualityRelated==1?'是':'否'"></span>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="原因">
						<span >
							{{form.qualityRemark}}
						</span>
					</el-form-item>
				</el-col>
				<el-col :span="12">

				</el-col>
			</el-row>
		</fieldset>
		<fieldset>
			<legend>客户反馈信息</legend>
			<el-row>
				<!-- <UE :editorID=editorID
				    :defaultMsg=defaultMsg
				    :config=config
				    ref="ue_kehufankui"
				    v-model="form.feedback"></UE> -->
				<span v-html="form.feedback"></span>
			</el-row>
		</fieldset>
		<fieldset>
			<legend>品质调查</legend>
			<el-row>
				<!-- <UEPZDC :editorID=editorPZDCID
				    :defaultMsg=defaultMsg
				    :config=config
				    ref="ue_pinzhidiaocha"
				    v-model="form.survey"></UEPZDC> -->
				<span v-html="form.survey"></span>
			</el-row>
		</fieldset>
		<fieldset>
			<legend>品质分析</legend>
			<el-row>
				<!-- <UEPZFX :editorID=editorZLFXID
				    :defaultMsg=defaultMsg
				    :config=config
				    ref="ue_zhiliangfenxi"
				    v-model="form.analysis"></UEPZFX> -->
				<span v-html="form.analysis"></span>
			</el-row>
		</fieldset>
		<fieldset>
			<legend>影像资料</legend>
			<el-row>
				<!-- <el-upload ref="upload_yingxiang"
				    :action="uploadUrl"
				    :http-request="fileUpload"
				    :on-remove="fileRemove"
				    :file-list="filesList">
					<el-button size="small"
					    type="primary">点击上传</el-button>
				</el-upload> -->
				<el-tag v-for="item in filesList">
					<a @click="downloadFile(item)"
					    href="#">{{item.name}}</a>
				</el-tag>
			</el-row>
		</fieldset>
		<fieldset>
			<legend>最终报告文件</legend>
			<el-row>
				<!-- <el-upload ref="upload_baogao"
				    :action="uploadUrl"
				    :http-request="reportUpload"
				    :on-remove="reportRemove"
				    :file-list="reportList">
					<el-button size="small"
					    type="primary">点击上传</el-button>
				</el-upload> -->
				<el-tag v-for="item in reportList">
					<a @click="downloadFile(item)"
					    href="#">{{item.name}}</a>
				</el-tag>
			</el-row>
		</fieldset>
		<el-form-item>
			<el-button type="button"
			    @click.native.prevent="onReturn(
				    'form')
				    "
			    :loading="loading
				    ">返回</el-button>
			<!-- <el-button @click.native.prevent="resetForm(
				    'form')
				    ">重置</el-button> -->
		</el-form-item>
	</el-form>
</template>

<script>
// import SelectHospital from 'selectHospital'
// import SelectComplaintType from 'selectComplaintType'
import UE from 'ue'
import { downloadFile, viewComplaint } from '../../../api/api';
export default {
	data() {
		return {
			defaultMsg: '',
			editorID: "ue_kehufankui_id",
			editorPZDCID: "ue_pinzhidiaocha_id",
			editorZLFXID: "ue_zhiliangfenxi_id",
			config: {
				initialFrameWidth: null,
				initialFrameHeight: 250
			},
			// uploadUrl: Env.apiHost + '/file/upload',
			uploadUrl: '',
			// fileList_yingxiang: [],
			// fileList_baogao: [],
			filesList: [],
			reportList: [],
			loading: false,
			complaintTypeId: null,
			hospitalId: null,
			form: {
				acceptNo: '',
				acceptDay: '',
				operationDay: '',
				hospital: {
					id: null
				},
				complaintType: {
					id: null
				},
				productName: '',
				productSpec: '',
				productNo: '',
				validDay: '',
				feedback: '',
				survey: '',
				analysis: '',
				files: [],
				report: {
					id: null
				}
			},
			rules: {

			}
		}
	},
	components: {
	},
	mounted: function () {
		var _id = this.$route.query.id
		if (_id) {
			var para = {
				id: _id
			}
			viewComplaint(para).then((res) => {
				this.form = Object.assign({}, res.data)
				if (this.form.hospital) {
					this.hospitalId = this.form.hospital.id
					// this.$refs.hospital.setHospital(this.form.hospital.name)
				}
				if (this.form.complaintType) {
					this.complaintTypeId = this.form.complaintType.id
					// this.$refs.complaintType.setComplaintType(this.form.complaintType.name)
				}
				if (this.form.report) {
					this.reportList.push(Object.assign({}, this.form.report))
				}
				if (this.form.files) {
					this.filesList = Object.assign([], this.form.files)
				}
				this.$nextTick(function () {
					// this.$refs.ue_kehufankui.setUEContent(this.form.feedback)//客户反馈
					// this.$refs.ue_pinzhidiaocha.setUEContent(this.form.analysis)//品质调查
					// this.$refs.ue_zhiliangfenxi.setUEContent(this.form.survey)//品质分析
				})

			})
		}

	},
	methods: {
		downloadFile(file) {
			window.location.href = Env.apiHost + '/file/download?id=' + file.id
			// downloadFile({ id: file.id }).then((res) => {
			// 	window.open(res)
			// })
		},
		fileRemove(file, fileList) {
			this.form.files = Object.assign([], fileList)
		},
		reportRemove(file, fileList) {
			if (fileList.length > 0) {
				this.form.report = Object.assign({}, fileList[0])
			} else {
				this.form.report = { id: null }
			}
		},
		fileUpload(content) {
			var that = this
			var form = new FormData();
			form.append("file", content.file);
			uploadFile(form).then((res) => {
				that.form.files.push(Object.assign({}, res.data))
			})
		},
		reportUpload(content) {
			var that = this
			var form = new FormData();
			form.append("file", content.file);
			uploadFile(form).then((res) => {
				that.reportList = []
				that.reportList.push(Object.assign({}, res.data))
				that.form.report = Object.assign({}, res.data)
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();//表单重置
		},
		onReturn(formName) {
			this.$router.push({ path: '/customer/complaint' });
		},
		onSubmit(formName) {
			let that = this
			that.$refs.ue_kehufankui.getUEContent()//客户反馈
			that.$refs.ue_pinzhidiaocha.getUEContent()//品质调查
			that.$refs.ue_zhiliangfenxi.getUEContent()//品质分析
			that.form.hospital = {}
			that.form.hospital.id = that.hospitalId
			that.form.complaintType = {}
			that.form.complaintType.id = that.complaintTypeId
			that.$refs[formName].validate((valid) => {

				if (!valid) {
					// throw new Error('参数错误'); //验证判断	
					return false;
				}
				that.loading = true
				if (that.form.id) {
					editComplaint(that.form).then((res) => {
						this.loading = false;
						this.$router.push({ path: '/customer/complaint' });
					});
				} else {
					addComplaint(that.form).then((res) => {
						this.loading = false;
						this.$router.push({ path: '/customer/complaint' });
					});
				}
			})

		}
	}
}

</script>

<style scoped  lang="less">
.el-form-item {
  margin-bottom: 0 !important;
}
</style>