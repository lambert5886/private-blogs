<template>
    <div class="item-wrapper">
        <h2 @click="goToDetailHandle">{{detail.title}}</h2>
        <div class="description">
            <span class="articleImg">

            </span>
            <span class="des">
                {{detail.description}}
            </span>
        </div>
        <slot name="footInfo"></slot>

    </div>
</template>
<script>
export default {
    props: {
        detail: {
            type: Object,
            default: () => {}
        }
    },
    data(){
        return {}
    },
    methods: {
        goToDetailHandle(){
            EventBus.$emit('goToDetail');
        }
    }
}
</script>
<style lang="less"scoped>
    .item-wrapper{
        width: 100%;
        font-size: 16px;
        padding: 10px;
        h2:hover{
            cursor: pointer;
        }
    }
    .item-wrapper:hover{
        box-shadow: 1px 1px 7px #ccc;
    }
    h2{
        font-size: 18px;
    }
</style>

