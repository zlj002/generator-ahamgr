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
						<el-input v-model="form.acceptNo"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="受理日期"
					    prop="acceptDay">
						<el-date-picker type="date"
						    placeholder="选择日期"
						    value-format="yyyy-MM-dd"
						    v-model="form.acceptDay"
						    style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="手术日期"
					    prop="operationDay">
						<el-date-picker type="date"
						    placeholder="选择日期"
						    value-format="yyyy-MM-dd"
						    v-model="form.operationDay"
						    style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="医院"
					    prop="hospitalId">
						<SelectHospital ref="hospital"
						    style="width: 100%;"
						    v-model="hospitalId"></SelectHospital>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="产品名称"
					    prop="productName">
						<el-input v-model="form.productName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="产品规格"
					    prop="productSpec">
						<el-input v-model="form.productSpec"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="产品批号"
					    prop="productNo">
						<el-input v-model="form.productNo"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="有效期"
					    prop="validDay">
						<el-date-picker type="date"
						    placeholder="选择日期"
						    value-format="yyyy-MM-dd"
						    v-model="form.validDay"
						    style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="投诉类型"
					    prop="complaintTypes">
						<SelectComplaintType ref="complaintType"
						    style="width: 100%;"
						    v-model="complaintTypes"></SelectComplaintType>
					</el-form-item>
				</el-col>
				<el-col :span="12">
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="质量问题"
					    prop="qualityRelated">
						<el-radio-group v-model="form.qualityRelated">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="原因"
					    prop="qualityRemark">
						<el-input v-model="form.qualityRemark"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</fieldset>
		<fieldset>
			<legend>客户反馈信息</legend>
			<el-row>
				<UE :editorID=editorID
				    :defaultMsg=defaultMsg
				    :config=config
				    ref="ue_kehufankui"
				    v-model="form.feedback"></UE>
			</el-row>
		</fieldset>
		<fieldset>
			<legend>品质调查</legend>
			<el-row>
				<UEPZDC :editorID=editorPZDCID
				    :defaultMsg=defaultMsg
				    :config=config
				    ref="ue_pinzhidiaocha"
				    v-model="form.survey"></UEPZDC>
			</el-row>
		</fieldset>
		<fieldset>
			<legend>品质分析</legend>
			<el-row>
				<UEPZFX :editorID=editorZLFXID
				    :defaultMsg=defaultMsg
				    :config=config
				    ref="ue_zhiliangfenxi"
				    v-model="form.analysis"></UEPZFX>
			</el-row>
		</fieldset>
		<fieldset>
			<legend>影像资料</legend>
			<el-row>
				<el-upload ref="upload_yingxiang"
				    :action="uploadUrl"
				    :http-request="fileUpload"
				    :on-remove="fileRemove"
				    :file-list="filesList">
					<el-button size="small"
					    type="primary">点击上传</el-button>
				</el-upload>
			</el-row>
		</fieldset>
		<fieldset>
			<legend>最终报告文件</legend>
			<el-row>
				<el-upload ref="upload_baogao"
				    :action="uploadUrl"
				    :http-request="reportUpload"
				    :on-remove="reportRemove"
				    :file-list="reportList">
					<el-button size="small"
					    type="primary">点击上传</el-button>
				</el-upload>
			</el-row>
		</fieldset>
		<el-form-item>
			<el-button type="button"
			    @click.native.prevent="onSubmit(
				    'form')
				    "
			    :loading="loading
				    ">保存</el-button>
			<el-button @click.native.prevent="resetForm(
				    'form')
				    ">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import SelectHospital from 'selectHospital'
import SelectComplaintType from 'selectComplaintType'
import UE from 'ue'
import { addComplaint, uploadFile, viewComplaint, editComplaint } from '../../../api/api';
export default {
	data() {
		var validateHospital = (rule, value, callback) => {
			var value = this.hospitalId;
			if (!value) {
				callback(new Error('请选择医院'));
			} else {
				callback();
			}
		}
		var validateComplaintTypes = (rule, value, callback) => {
			var value = this.complaintTypes;
			if (!value || value.length <= 0) {
				callback(new Error('请至少选择一项投诉类型'));
			} else {
				callback();
			}
		};
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
			complaintTypes: [],
			hospitalId: '',
			form: {
				acceptNo: '',
				acceptDay: '',
				operationDay: '',
				hospital: {},
				complaintTypes: [],
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
				},
				qualityRemark: '',
				qualityRelated: 1
			},
			rules: {
				complaintTypes: [
					// { required: true, message: '请选择投诉类型', trigger: 'blur' }
					// { type: 'array', required: true, message: '请至少选择一个投诉类型', trigger: 'blur' }
					{ required: true, validator: validateComplaintTypes, trigger: 'change' }

				],
				qualityRelated: [
					{ required: true, message: '请输入原因', trigger: 'blur' }
				],
				qualityRemark: [
					{ required: true, message: '请输入原因', trigger: 'blur' }
				],
				acceptNo: [
					// { required: true, message: '请输入受理单号', trigger: 'blur' }
				],
				acceptDay: [
					{ required: true, message: '请输入受理日期', trigger: 'blur' }
				],
				operationDay: [
					{ required: true, message: '请输入手术日期', trigger: 'blur' }
				],
				hospitalId: [
					{ required: true, validator: validateHospital, trigger: 'change' }
				],
				productName: [
					{ required: true, message: '请输入产品名称', trigger: 'blur' }
				],
				productSpec: [
					{ required: true, message: '请输入产品规格', trigger: 'blur' }
				],
				productNo: [
					{ required: true, message: '请输入产品批号', trigger: 'blur' }
				],
				validDay: [
					{ required: true, message: '请输入有效期', trigger: 'blur' }
				]
			}
		}
	},
	components: {
		SelectHospital: SelectHospital,
		SelectComplaintType: SelectComplaintType,
		UE: UE,
		UEPZDC: UE,
		UEPZFX: UE
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
					this.$refs.hospital.setHospital(this.form.hospital.name)
				}
				if (this.form.complaintTypes && this.form.complaintTypes.length > 0) {
					// 	this.complaintTypeId = this.form.complaintType.id
					this.$refs.complaintType.setComplaintType(this.form.complaintTypes)
				}
				if (this.form.report) {
					this.reportList.push(Object.assign({}, this.form.report))
				}
				if (this.form.files) {
					this.filesList = Object.assign([], this.form.files)
				}
				if (this.form.complaintTypes) {
					this.complaintTypes = Object.assign([], this.form.complaintTypes.map(item => item.id))
				}
				this.$refs.ue_kehufankui.setUEContent(this.form.feedback)//客户反馈
				this.$refs.ue_pinzhidiaocha.setUEContent(this.form.analysis)//品质调查
				this.$refs.ue_zhiliangfenxi.setUEContent(this.form.survey)//品质分析

			})
		}

	},
	methods: {
		fileRemove(file, fileList) {
			this.form.files.forEach((item, index) => {
				if (item.id == file.id) {
					delete this.form.files[index]
				}
			})
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
				that.filesList.push(Object.assign({}, res.data))
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
		onSubmit(formName) {
			let that = this
			that.$refs.ue_kehufankui.getUEContent()//客户反馈
			that.$refs.ue_pinzhidiaocha.getUEContent()//品质调查
			that.$refs.ue_zhiliangfenxi.getUEContent()//品质分析
			//处理医院
			that.form.hospital = {}
			that.form.hospital.id = that.hospitalId
			//处理投诉类型
			that.form.complaintTypes = [];
			Util.log(that.complaintTypes)
			if (that.complaintTypes.length > 0) {
				for (var i = 0; i < that.complaintTypes.length; i++) {
					that.form.complaintTypes.push({
						id: that.complaintTypes[i]
					})
				}
			}
			//处理文件
			if (this.form.files && this.form.files.length > 0) {
				this.form.files.removeEmptyEle(this.form.files)
			}
			that.$refs[formName].validate((valid) => {

				if (!valid) {
					// throw new Error('参数错误'); //验证判断	
					setTimeout(function () {
						document.querySelector('.content-container').scrollTop = 0;
					}, 100);
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