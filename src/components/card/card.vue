<template>
    <transition name="card">
        <div class="card-wrapper"
             :class="{'hover': isShow}"
             @mouseover="show"
             @mouseout="hidden">
            <div class="img-wrapper">
                <img :src="item.imgSrc" alt="">
            </div>
            <h3> 
                {{item.title}}
            </h3> 
            <p class="des">
                {{item.description}}
            </p>
            <p class="link" v-if="item.path">
                <router-link :to="item.path">{{item.linkTitle}}</router-link>

            </p>
            

        </div>
    </transition>
   
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
        isShow: false,
    };
  },
  methods: {
      show(){
          this.isShow = true;
      },
      hidden(){
          this.isShow = false;
      }
  }
 
};
</script>

<style scoped>
.card-wrapper {
  width: 160px;
  height: auto;
  border-radius: 5px;
  border: 1px solid #ccc;
  float: left;
  margin-right: 10px;
  box-shadow: 0px 0px 0px #ccc;
  transition: box-shadow 1s;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.card-wrapper:hover{
    cursor: pointer;
}
.card-wrapper.hover{
    box-shadow: 1px 1px 8px #ccc;
    transition: box-shadow 1s;
}
.card-wrapper .img-wrapper img{
    transform: scale(1);
    transition: transform 1s;
}
.card-wrapper.hover .img-wrapper img{
    transform: scale(1.2);
    transition: transform 1s;
}

.img-wrapper {
  width: 80%;
  margin: auto;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
}
.img-wrapper img {
  width: 100%;
}

h3{
    width: 90%;
    margin: auto;
    padding: 3px 0;
}
.des{
    width: 90%;
    margin: auto;
    text-indent: 30px;
    text-overflow: ellipsis;
}
.link{
    width: 90%;
    margin: auto;
    
}
</style>


