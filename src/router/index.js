import Vue from 'vue'
import VueRouter from 'vue-router'

import app from '@/app.vue';

// 前端页面
import homePage from '@/pages/homePage';

// 后台页面
import adminHome from '@/adminPage/adminIndex';
import menuManagement from '@/adminPage/menuManagement';
import contManagement from '@/adminPage/contManagement';

//内容添加
import editor from '@/components/text-editor';


Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: homePage,
		children: [
			{
			  path: '/article/:id',
			  component: homePage,
			  children: [
				  {
					  path: 'home',
					  component: homePage
				  }
			  ]
			},
		
		]
	},
	{
		path: '/admin',
		component: adminHome,
		children: [
			{path: '/admin/menuManagement',
			 component: menuManagement
			},
			{path: '/admin/contManagement/:id',
			component: contManagement,
			//  children: [
			// 	{path: 'index',
			// 	component: contManagement,
				   
			// 	},
			// 	 {path: 'add',
			// 	 component: editor,
					
			// 	 }
			//  ]
			}
		]
	}




	// {
	// 	path: '/article',
	// 	name: 'home',
	// 	component: app,
	// 	children: [{
	// 		path: '/article/:id',
	// 		component: homePage,
	// 		children: [
	// 			{
	// 				path: 'Html5',
	// 				name: 'Html5',
	// 				component: homePage,
	// 			},
	// 			{
	// 				path: 'css2',
	// 				name: 'css2',
	// 				component: homePage,
	// 			},
	// 			{
	// 				path: 'javascript',
	// 				name: 'javascript',
	// 				component: homePage,
	// 			}
	// 		]
	// 	},
	// ]
	// },
	// {
	// 	path: '/admin',
	// 	name: 'admin',
	// 	component: app,
	// 	children: [{
	// 		path: 'menuManagement',
	// 		name: 'menuManagement',
	// 		component: menuManagement,

	// 	}]
	// }
	
];

const router = new VueRouter({
	routes
});

export default router;