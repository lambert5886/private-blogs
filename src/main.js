// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'
// import 'iview/dist/styles/iview.css';
import '@/theme/index.less';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueAxios, axios);


import router from  './router'
import store from './store';
import App from './app';



new Vue({
	el: '#app',
	router,
	// store,
	render: h => h(App)

});