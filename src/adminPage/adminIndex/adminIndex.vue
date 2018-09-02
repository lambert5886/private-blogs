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
          text: "菜单管理",
          name: "menu",
          path: "/admin/menuManagement",
          hasChilds: false
        },
          {
          text: "内容管理",
          name: "cont",
          path: "/admin/contManagement/index",
          hasChilds: false
        }
      ];
    }
  },
  components: {
    headerNav
  }
};
</script>

