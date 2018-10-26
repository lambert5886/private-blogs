<template>
  <div>
    <headerNav :menuList="menu">

    </headerNav>

    <router-view></router-view>

  </div>

</template>

<script>
import headerNav from "@/components/header";
export default {
  data() {
    return {
      menu: [
        {
          title: "菜单管理",
          name: "menu",
          path: "/admin/menuManagement",
          childrenList: []
        },
        {
          title: "内容管理",
          name: "cont",
          path: "/admin/contManagement/index",
          childrenList: []
        }
      ]
    };
  },
  mounted() {
    this.getMenu();
  },
  methods: {
    getMenu() {
    
      this.axios({
        method: "get",
        url: "http://localhost:8099/menu/getMenu"
      }).then(res => {
        let _datas = res.data.data;

        for (let i = 0; i < _datas.length; i++) {
          if (_datas[i].menuType == "1") {
            this.menu.push(_datas[i]);
          }
        }
      });
    }
  },

  computed: {},
  components: {
    headerNav
  }
};
</script>

