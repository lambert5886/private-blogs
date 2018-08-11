
import vue from 'vue';
import Vuex from 'vuex';
// import {message} from './modules/message';
// import {gridStore} from './modules/grid';

vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		// message: message,
		// grid: gridStore
	}
})

export default store;