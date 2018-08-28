<template>
	<el-select v-model="valueHospital"
	    filterable
	    remote
	    clearable
	    placeholder="请输入医院名称"
	    :remote-method="selectHospital"
	    :loading="loading"
	    @input="handleInput">
		<el-option v-for="item in options"
		    :key="item.id"
		    :label="item.name"
		    :value="item.id">
		</el-option>
	</el-select>
</template>
<script>
import { findHospitalByNameLike } from '../../apps/api/api'
export default {
	data() {
		return {
			loading: false,
			valueHospital: '',
			options: [],
			list: []
		}
	},
	created() {
		// this.selectHospital()
	},
	methods: {
		setHospital(query) {
			if (query !== '') {
				this.loading = true
				let para = {
					name: query
				}
				//NProgress.start()
				findHospitalByNameLike(para).then((res) => {
					this.list = res.data
					this.loading = false
					this.options = this.list.filter(item => {
						return item.name.toLowerCase()
							.indexOf(query.toLowerCase()) > -1
					})
					this.valueHospital = query
					//NProgress.done()
				})
			} else {
				this.options = []
			}
		},
		selectHospital(query) {
			if (query !== '') {
				this.loading = true
				let para = {
					name: query
				}
				//NProgress.start()
				findHospitalByNameLike(para).then((res) => {
					this.list = res.data
					this.loading = false
					this.options = this.list.filter(item => {
						return item.name.toLowerCase()
							.indexOf(query.toLowerCase()) > -1
					})
					//NProgress.done()
				})
			} else {
				this.options = []
			}
		},
		handleInput() {
			Util.log(this.valueHospital)
			this.$emit('input', this.valueHospital) //触发 input 事件，并传入新值
		}
	}
}
</script>
