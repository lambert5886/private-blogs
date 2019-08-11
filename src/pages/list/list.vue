<template>
    <div class="list-wrapper">
        <span class="span" @click="goToDetailHandle" style="padding: 20px;display: inline-block;">点击进详情</span>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        goToDetailHandle() {
            console.log('list click')
            this.$router.push({path: '/aritcle/detail/'})
            
        }
    }
}
</script>
<style lang="less" scoped>
    .span:hover{
        cursor: pointer;
    }
</style>