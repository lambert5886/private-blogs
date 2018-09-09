<template>
    <div class="cont">
        <Row :gutter="16" :style="{'margin-top': '10px'}">
            <div class="caozuo">
                <Button type="success" @click="showAddNew">新增</Button>
            </div>
            <div class="caozuo edit">
                <Button type="warning" @click="articleEditor">修改</Button>
            </div>
            <div class="caozuo">
                <Button type="error" @click="getArticle">删除</Button>
            </div>

            {{this.$route.params.id}}

        </Row>
        <Row>
            <Col span="2">
            &nbsp;
            </Col>
            <Col span="18">
             <component :is="current" :saveUrl="url"></component>

            </Col>

           
        </Row>
    </div>
</template>

<script>
import addEditor from '@/components/text-editor';
export default {
  data() {
    return {
        current: '',
        url: ''

    };
  },
  methods: {
      showAddNew(){
          this.$router.push({path: '/admin/contManagement/add'});
          this.url = '/saveAdd';
      },
      articleEditor(){
          this.$router.push({path: '/admin/contManagement/editor',});
          this.url = '/saveEditor';
      },
      getArticle(){
          let params = {
                  title: '123'
              };

          this.axios({
              method: 'post',
              url: 'http://localhost:8099/getArticle',
              data: params,
          }).then( (res) => {
              console.log('请求的数据 >>>>  ',res);
          })
      }
  },
  beforeRouteUpdate(to, from, next){
      console.log(this.$route.params.id, ' <<< id change <<<< ');
      console.log(to, )
     if( to.params.id == 'add' )  this.current = addEditor ;

      next();
  }, 
  components: {
      addEditor
  }
};
</script>

<style scoped>
.cont {
}

div.caozuo {
  float: left;
  margin-left: 15px;
  margin-bottom: 10px;
}
.edit {
 
}
</style>


