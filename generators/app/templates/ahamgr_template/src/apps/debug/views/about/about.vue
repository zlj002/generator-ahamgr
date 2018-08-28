<template>
<div class="f">
    {{firstName}} {{lastName}} aka {{alias}}
    <div class="e">alsdjfasdf</div>
</div>
</template>
<script>
var Sys = require('sys');
export default {
    data: function () {
        Sys.log('aaaaa')
        return {
            firstName: 'aaaa',
            lastName: 'bbbb',
            alias: 'ccc'
        }
    }
}
</script>
