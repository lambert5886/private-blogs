<template>
  <div>
    <Header>
      <HeadNav :menuList='headNavLists'></HeadNav>

    </Header>
    <content>
      <home></home>
      <!-- <component :is="currentComponent"></component> -->
      <!-- <router-view></router-view> -->
    </content>
    <!--  -->
  </div>
</template>

<script>
import HeadNav from "@/components/header";
import home from "@/pages/home";
// import Html5 from "@/pages/html5";
// import css3 from "@/pages/css3";
// import javascript from "@/pages/javascript";

import gql from "@/apollo";

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
    // Html5,
    // css3,
    // javascript,
    home,
    HeadNav
  },
  methods: {
    getMenus() {
      let _params ={
          query: `{
                getMenus  {
                      title,
                      id,
                      menuType,
                      path,
                      childrenList{
                        title,
                        path
                      }
                  }
                }  `
      };
      this.axios({
        method: "POST",
        url: "http://localhost:8099/graphql",
        data: _params,
      }).then(res => {
        let _datas = res.data.data.getMenus;
        console.log('query >>> ',res.data.data.getMenus)
        this.headNavLists = [];
        for(let i = 0; i < _datas.length; i++){
          if(_datas[i].menuType == '0'){
            this.headNavLists.push(_datas[i]);
          }
        }

        ;
      });
    }

    // getMenus() {
    //   this.$apollo
    //     .query({
    //       query: gql.workorder
    //     })
    //     .then(res => {
    //       let _datas = res.data.getMenus;
    //       this.headNavLists = [];
    //       for (let i = 0; i < _datas.length; i++) {
    //         if (_datas[i].menuType == "0") {
    //           this.headNavLists.push(_datas[i]);
    //         }
    //       }
    //       console.log(this.headNavLists);
    //     });
    // }
  },
  computed: {
    currentComponent() {
      return this.current;
    }
  }
};
</script>