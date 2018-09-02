<template>
    <div class="list">
        <Layout>
            <content>
                  <card v-for="(item, index) in cardLists"
                        :key="index"
                        :item="item" ></card>
            </content>
        </Layout>
      
    </div>
</template>

<script>
import card from '@/components/card';

export default {
    data(){
        return {}
    },
    computed: {
      
        cardLists(){
            let _datas = {
                    id: 12345,
                    other: 'hhh'
                };
            this.axios({
                method: 'post',
                url:'http://localhost:8099/home',
               data: _datas ,
            }).then(function(res){
                console.log(' 响应 >>> ', res);
            })








            return [{
                title: '标题标题',
                description: '内容简介内容简介',
                imgSrc: require('@/assets/b04.jpg'),
                path: '',
                linkTitle: '阅读原文'
            },
            {
                title: '标题标题2222',
                description: '内容简介内容简介2222',
                 imgSrc:  require('@/assets/b04.jpg'),
                path: '',
                linkTitle: '阅读原文'
            },
            {
                title: '标题标题3333',
                description: '内容简介内容简介3333',
                 imgSrc:  require('@/assets/b04.jpg'),
                path: '',
                linkTitle: '阅读原文'
            },
            {
                title: '标题标题4444',
                description: '内容简介内容简介4444内容简介内容简介4444内容简介内容简介4444',
                 imgSrc:  require('@/assets/b04.jpg'),
                path: '',
                linkTitle: '阅读原文'
            }]
        }
    },
    components: {
        card
    }
}
</script>
<style scoped>
.list{
    clear: both;
}
</style>

