<template>
  <div>
    <headerNav :menuList="menu">

    </headerNav>

    <router-view></router-view>

  </div>

</template>

<script>
import headerNav from "@/components/header";
import urls from "@/pages/common/urlConfig";
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
      let _params = {};
      _params.method = "get";
      _params.type = "getMenu";

      this.axios({
        url: urls,
        params: _params
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

