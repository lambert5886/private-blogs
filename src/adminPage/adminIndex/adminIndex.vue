<template>
    <div>
        <headerNav
            :menuList="menu">

        </headerNav>
        
       	<router-view></router-view>
			
    </div>
  
</template>

<script>
import headerNav from "@/components/header";
export default {
  data() {
    return {};
  },
  computed: {
    menu() {
      return [
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
      ];
    }
  },
  components: {
    headerNav
  }
};
</script>

