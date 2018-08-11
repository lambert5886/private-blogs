import Vue from 'vue'
import VueRouter from 'vue-router'

import app from '@/app.vue';
import homePage from '@/pages/homePage';

Vue.use(VueRouter);

const routes = [
	{
		path: '/:id',
		name: 'home',
		component: homePage,
		children: [{
			path: 'home',
			component: homePage,
		},
		{
			path: 'Html5',
			name: 'Html5',
			component: homePage,
		},
		{
			path: 'css2',
			name: 'css2',
			component: homePage,
		},
		{
			path: 'javascript',
			name: 'javascript',
			component: homePage,
		}]
	},
	
];

const router = new VueRouter({
	routes
});

export default router;