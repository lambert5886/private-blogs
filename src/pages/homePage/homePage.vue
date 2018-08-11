<template>
    <div>
    <component :is="currentComponent"></component>
 </div>
</template>

<script>
import home from '@/pages/home';
import Html5 from '@/pages/html5';
import css3 from '@/pages/css3';
import javascript from '@/pages/javascript';


export default {
  data() {
    return {
      current: 'home'
    };
  },
  methods: {
     
  },

   beforeRouteUpdate (to, from, next) {
    this.current = to.params.id;
    console.log('from homepage  :::  ', this.$route.params.id, to.params.id);
    next();
  },
 

  components: {
    Html5,
    css3,
    javascript,
    home

  },
  computed: {
    currentComponent(){
      return this.current;
    }
  }
};
</script>

