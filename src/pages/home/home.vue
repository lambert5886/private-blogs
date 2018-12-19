<template>
  <div>
    <aritcleIndex></aritcleIndex>
     <Upload 
        :data="datas"
        
        action="http://localhost:8099/fileServer">
         <!-- type="drag" -->
        <Button type="ghost" icon="ios-cloud-upload-outline"> 上传 </Button>
    </Upload>
  </div>
   
</template>

<script>
 import aritcleIndex from '@/pages/index';
export default {
  data() {
    return {
      datas: {
        name: 'hello'
      }
    };
  },
  
  components: {
    aritcleIndex
  }
 
};
</script>
<style scoped>
 
</style>

