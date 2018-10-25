<template>
  <div>
    <Header>
      <HeadNav :menuList='headNavLists'></HeadNav>

    </Header>
    <content>
      <component :is="currentComponent"></component>
      <!-- <router-view></router-view> -->
    </content>
    <!--  -->
  </div>
</template>

<script>
  import HeadNav from "@/components/header";
  import home from "@/pages/home";
  import Html5 from "@/pages/html5";
  import css3 from "@/pages/css3";
  import javascript from "@/pages/javascript";

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
      Html5,
      css3,
      javascript,
      home,
      HeadNav
    },
    methods: {
      getMunus() {
        this.axios({
          method: "get",
          url: "http://localhost:8099/menu/getMenu"
        }).then(res => {
          console.log(res, "get Menu");
          this.headNavLists = [];
          this.headNavLists.push(...res.data.data);
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