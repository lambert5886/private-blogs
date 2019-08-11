<template>
    <div class="read-info-wrap">
        <p @click="goToListHandle" class="tag">
           <Icon type="ios-pricetag"></Icon>{{ readInfo.tag }}
        </p>
        <p class="time">
           <Icon type="ios-time"></Icon>{{ readInfo.time }}
        </p>
        <p class="read">
           <Icon type="eye"></Icon> 浏览({{ readInfo.read }})
        </p>
        <p class="love">
           <Icon type="android-favorite"></Icon> 喜欢({{ readInfo.love }})
        </p>

        <p class="read-all" @click="goTodetailHandle">
            阅读全文
        </p>
    </div>
</template>
<script> 
export default {
    props: {
        readInfo: {
            type: Object,
            default: () => {}
        }
    },
    data(){
        return {}
    },
    methods: {
        goTodetailHandle(){
            EventBus.$emit('goToDetail', this.readInfo);
        },
        goToListHandle(){
            EventBus.$emit('goToList', this.readInfo);
        }
    }

}
</script>
<style lang="less" scoped>
@deep: ~'>>>';
.read-info-wrap{
    @{deep} p{
        display: inline-block;
        padding: 5px;
        font-size: 14px;
    }
    @{deep} p.love{
        i{   
            color: #fb788a;
        }
    }
    @{deep} p.time{
        i{
            color: #6ecae9;
        }
    }
    @{deep} p.tag{
        i{
            color: #f8a8a8;
        }
    }
    @{deep} p.tag:hover{
        cursor: pointer;
    }

    @{deep} p.read{
        i{
            font-size: 20px;
        }
    }
    @{deep} p.read-all{
        position: absolute;
        right: 10px;
    }
    @{deep} p.read-all:hover{
        cursor: pointer;
    }
}
</style>

