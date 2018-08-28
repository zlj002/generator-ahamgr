<template>
    <div>
        <script :id=editorID
            type="text/plain"></script>
    </div>
</template>
<script>
export default {
    name: 'UE',
    data() {
        return {
            editor: null
        }
    },
    props: {
        editorID: {
            type: String
        },
        defaultMsg: {
            type: String
        },
        config: {
            type: Object
        }
    },
    mounted() {
        const _this = this
        this.editor = UE.getEditor(_this.editorID, this.config)// 初始化UE
        this.editor.addListener("ready", function () {
            _this.editor.setContent(_this.defaultMsg)// 确保UE加载完成后，放入内容。
        });
    },
    methods: {
        setUEContent(content) {
            const _this = this;
            // this.editor = UE.getEditor(_this.editorID, this.config)// 初始化UE
            this.editor.addListener("ready", function () { 
                setTimeout(() => {
                    _this.editor.setContent(content)// 确保UE加载完成后，放入内容。    
                }, 500);
            });
        },
        getUEContent() { // 获取内容方法
            let content = this.editor.getContent();
            this.$emit('input', content)//触发 input 事件，并传入新值
            // this.$notify({
            //     title: '获取成功，可在控制台查看！',
            //     message: content,
            //     type: 'success'
            // });
            return content
        },
        handleInput() {
            this.$emit('input', this.editor.getContent())//触发 input 事件，并传入新值
            
        }
    },
    destroyed() {
        this.editor.destroy();
    }
}
</script>