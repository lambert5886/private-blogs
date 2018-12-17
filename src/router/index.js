import Vue from 'vue'
import VueRouter from 'vue-router'

import app from '@/app.vue';

// 前端页面
import homePage from '@/pages/homePage';
// 首页

// 后台页面
import adminHome from '@/adminPage/adminIndex';
import menuManagement from '@/adminPage/menuManagement';
import contManagement from '@/adminPage/contManagement';

//内容添加
import editor from '@/components/text-editor';


Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: homePage,
    children: [{
        path: '/article/:id',
        component: homePage,
        children: [{
          path: 'home',
          component: homePage
        }]
      },

    ]
  },
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
      //  {
      //   path: '/admin/contManagement/edit',
      //   component: contManagement,
        
      // }
    ]
  }




];

const router = new VueRouter({
  routes
});

export default router;
