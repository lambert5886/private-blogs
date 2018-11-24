<template>
    <div class="item-wrapper">
        <h2>6条网页设计配色原则,让你秒变配色高手</h2>
        <div class="description">
            <span class="articleImg">

            </span>
            <span class="des">
                网页设计好不好看,颜色是毋庸置疑要排首位的,所以关于颜色的搭配技巧以及原则,对
            </span>
        </div>
        <slot name="footInfo"></slot>

    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
        }
    },
    data(){
        return {}
    }
}
</script>
<style scoped>
    .item-wrapper{
        width: 100%;
        font-size: 16px;
    }
    h2{
        font-size: 18px;
    }
</style>

