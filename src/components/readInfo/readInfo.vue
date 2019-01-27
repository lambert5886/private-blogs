<template>
    <div class="read-info-wrap">
        <p class="tag">
           <Icon type="ios-pricetag"></Icon> html
        </p>
        <p class="time">
           <Icon type="ios-time"></Icon> 2019-01-12
        </p>
        <p class="read">
           <Icon type="eye"></Icon> 浏览(444)
        </p>
        <p class="love">
           <Icon type="android-favorite"></Icon> 喜欢(30)
        </p>

        <p class="read-all">
            阅读全文
        </p>
    </div>
</template>
<script>
export default {
    data(){
        return {}
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

    @{deep} p.read{
        i{
            font-size: 20px;
        }
    }
    @{deep} p.read-all{
        position: absolute;
        right: 0;
    }
}
</style>

