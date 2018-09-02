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
      current: "home"
    };
  },
  methods: {},

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
  computed: {
    currentComponent() {
      return this.current;
    },
        headNavLists() {
      var _arr = [
        {
          text: "é¦–é¡µ",
          name: "nav_01",
          path: "/article/home",
          hasChilds: false
        },
        {
          text: "Html5",
          name: "nav_01",
          path: "/article/Html5",
          hasChilds: false
        },
        {
          text: "css3",
          name: "nav_01",
          hasChilds: true,
          childItems: [
            {
              text: "css2",
              name: "nav_02",
              path: "/article/css3",
              hasChilds: false
            },
            {
              text: "css2",
              name: "nav_02",
              path: "/article/css3",
              hasChilds: false
            }
          ]
        },
        {
          text: "Javascript",
          name: "nav_01",
          path: "/article/javascript",
          hasChilds: false
        }
      ];
      return _arr;
    }
  }
};
</script>

