
<template>
	<div class="layout">
		<Layout>
			<Header>
					<HeadNav :menuList='headNavLists'></HeadNav>
			
			</Header>
			<content>
					<router-view></router-view>
			</content>
			
			
		</Layout>
		
	</div>
</template>

<script>
import "./assets/font-awesome-4.7.0/css/font-awesome.min.css";
// import Vue from 'vue';
import HeadNav from '@/components/header';
export default {
  data() {
    return {};
	},
	

  computed: {
		headNavLists(){
			var _arr = [{
				text: '首页',
				name: 'nav_01',
				path: '/home',
				hasChilds: false,
			},
			{
				text: 'Html5',
				name: 'nav_01',
					path: '/Html5',
				hasChilds: false,
			},
			{
				text: 'css3',
				name: 'nav_01',
				hasChilds: true,
				childItems: [
					{text: 'css2',
					name: 'nav_02',
						path: '/css3',
					hasChilds: false,},
						{text: 'css2',
					name: 'nav_02',
						path: '/css3',
					hasChilds: false,}
				]
			},
			{
				text: 'Javascript',
				name: 'nav_01',
					path: '/javascript',
				hasChilds: false,
			}];
			 return _arr;
		}
	},
  components: {
		HeadNav
	}
};
</script>

<style>
</style>