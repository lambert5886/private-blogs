<template>
  <div>
    <Header>
      <HeadNav :menuList='headNavLists'></HeadNav>
    </Header>
    <content style="float: left;width: 80%;">
      <router-view></router-view>
    </content>
     <div style="float: right; width: 20%;">
        <sideList></sideList>
     </div>
  </div>
</template>
<script>
import HeadNav from "@/components/header";
import sideList from "@/pages/sidebar";
import home from "@/pages/home";
import urls from "@/pages/common/urlConfig";
 
export default {
  data() {
    return {
      current: "home",
      headNavLists: []
    };
  },
  mounted() {
    this.getMenus();
  },
  beforeRouteUpdate(to, from, next) {
    this.current = to.params.id;
    console.log("from homepage  :::  ", this.$route.params.id, to.params.id);
    next();
  },
  components: {
    sideList,
    home,
    HeadNav
  },
  methods: {
    getMenus() {
      let _params ={};
      _params.type = 'getMenu';
      this.axios({
        method: "POST",
        url: urls,
        data: _params,
      }).then(res => {
        let _datas = res.data.data;
        console.log('query >>> ',res.data.data)
        this.headNavLists = [];
        for(let i = 0; i < _datas.length; i++){
          if(_datas[i].menuType == '0'){
            this.headNavLists.push(_datas[i]);
          }
        };
      });
    }
  },
  computed: {
    currentComponent() {
      return this.current;
    }
  }
};
</script>