<template>
  <div>
   
  </div>
</template>

<script>
  import { EventBus } from '@/tools';
  export default {
    props: {
      mark: {
        type: String,
      },
      editMenu: {
        type: Object,
        default: () => {}
      }
    },
    data(){
      return {
         menuType: [{ type: 0, text: "前端" }, 
                    { type: 1, text: "后端" }],
         
     
        formItem: {}
      }
    },
    mounted(){
      EventBus.$on('getForm' + this.mark, this.getFormHandle);
      this.formItem = Object.assign({}, this.editMenu);
    },
    methods: {
      getFormHandle(){
        EventBus.$emit('setForm', this.formItem);
      }
    }
  }


</script>
