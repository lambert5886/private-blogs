<template>
    <div style="width:240px;">
        <div class="title">
            <h3>热门文章</h3>
        </div>
        <div class="hotList">
            <detail></detail>
        </div>
    </div>
</template>

<script>
import detail from '@/components/detail';
export default {
    data(){
        return {}
    },

    components: {
        detail
    }

}
</script>
<style scoped>
    h3{
        font-size: 20px;
    }
</style>

