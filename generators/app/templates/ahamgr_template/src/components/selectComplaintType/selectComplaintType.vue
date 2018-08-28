<template>
	<el-select v-model="valueComplaintType"
	    filterable
	    remote
	    clearable
	    :multiple="isMultiple"
	    placeholder="请输入投诉类型名称"
	    :remote-method="selectComplaintType"
	    :loading="loading"
	    automatic-dropdown
	    @input="handleInput">
		<el-option v-for="item in options"
		    :key="item.id"
		    :label="item.name"
		    :value="item.id">
		</el-option>
	</el-select>
</template>
<script>
import { findComplaintTypeByNameLike } from '../../apps/api/api'
export default {
	data() {
		return {
			loading: false,
			valueComplaintType: [],
			options: [],
			list: [],
			// isMultiple: true
		}
	},
	props: {
		isMultiple: {
			default: true
		}
	},
	mounted() {
		// this.list = this.states.map(item => {
		// 	return { value: item, label: item }
		// })
	},
	methods: {
		setComplaintType(complaintTypes) {
			this.options = []
			this.valueComplaintType = []
			if (complaintTypes.length >= 0) {
				complaintTypes.forEach(element => {
					this.options.push({
						id: element.id,
						name: element.name
					})
					this.valueComplaintType.push(element.id)
				});

			}
			else {
				this.options = []
			}
		},
		selectComplaintType(query) {
			if (query !== '') {
				this.loading = true
				let para = {
					name: query
				}
				//NProgress.start()
				findComplaintTypeByNameLike(para).then((res) => {

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
			Util.log(this.valueComplaintType)
			this.$emit('input', this.valueComplaintType) //触发 input 事件，并传入新值
		}
	}
}
</script>
