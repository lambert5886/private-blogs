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

  export default {
    data() {
      return {
        current: "home",
        headNavLists: []
      };
    },

    mounted() {
      this.getMunus();
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
      getMunus() {
        this.axios({
          method: "get",
          url: "http://localhost:8099/menu/getMenu"
        }).then(res => {
          let _datas = res.data.data;
          this.headNavLists = [];
          for(let i = 0; i < _datas.length; i++){
            if(_datas[i].menuType == '0'){
              this.headNavLists.push(_datas[i]);
            }
          }

          ;
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