import Vue from 'vue'
import VueRouter from 'vue-router'

import app from '@/app.vue';

// 前端页面
import homePage from '@/pages/homePage';
import ListPage from '@/pages/list';
import detailPage from "@/pages/details/"
import index from "@/pages/index";
// 首页

// 后台页面
import adminHome from '@/adminPage/adminIndex';
import menuManagement from '@/adminPage/menuManagement';
import contManagement from '@/adminPage/contManagement';

//内容添加
import editor from '@/components/text-editor';


Vue.use(VueRouter);

const routes = [{
    // 前台页面
    // path: '/:id',
    path: '/',
    component: homePage,
      children: [
       {
        path: '',
        component: index,
      },
      {
        path: '/aritcle/list',
        component: ListPage
      },
      {
        path: '/aritcle/detail',
        component: detailPage
      }
     
    ]
    
  },
 
  
  // 后台管理页面
  {
    path: '/admin',
    component: adminHome,
    children: [{
        path: '/admin/menuManagement',
        component: menuManagement
      },
      {
        path: '/admin/contManagement/:id',
        component: contManagement,

      },
   
    ]
  }




];

const router = new VueRouter({
  routes
});

export default router;
