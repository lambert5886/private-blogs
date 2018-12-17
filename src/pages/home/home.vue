<template>
  <div>
    <aritcleIndex></aritcleIndex>
     <Upload action="http://localhost:8099/fileServer">
        <Button type="ghost" icon="ios-cloud-upload-outline"> 上传 </Button>
    </Upload>
  </div>
   
</template>

<script>
 import aritcleIndex from '@/pages/index';
export default {
  data() {
    return {
      
    };
  },
  
  components: {
    aritcleIndex
  }
 
};
</script>
<style scoped>
 
</style>

