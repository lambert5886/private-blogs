// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'
// import 'iview/dist/styles/iview.css';
import '@/theme/index.less';
import axios from 'axios';
import VueAxios from 'vue-axios';
import  VueQuillEditor from 'vue-quill-editor';
  

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


 
 
 

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueAxios, axios, axios_instance);

Vue.use(VueQuillEditor)

var axios_instance = axios.create({
	
		transformRequest: [function (data) {
			data = Qs.stringify(data);
			return data;
		}],

		headers:{'Content-Type':'application/x-www-form-urlencoded'}
	})
import router from  './router'
import store from './store';
import App from './app';



new Vue({
	el: '#app',
	router,
	// store,

	render: h => h(App)

});