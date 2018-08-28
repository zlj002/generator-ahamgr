<template>
<div class="f">
    {{firstName}} {{lastName}} aka {{alias}}
    <div class="e">哈哈哈</div>
    <img src="./img/test.png">
</div>
</template>
<script>
export default {
    data: function () {
        return {
            firstName: 'Walter',
            lastName: 'White',
            alias: 'Heisenberg'
        }
    }
}
</script>
<style lang="less" scoped>
.f{
    font-size: 20px;
    .e{
        font-size: 30px;
    }
}
</style>
