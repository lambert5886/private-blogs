<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <div v-for="(item, index) in menuList"
             :key="index">
            <Submenu v-if="item.hasChilds" 
                     name="item.name">
                 <template slot="title">
                    <Icon type="stats-bars"></Icon>
                      {{item.text}}
                 </template>
                 <menu-item v-for="(value, keys) in item.childItems" 
                            :key="keys"
                            name="value.name">
                    <router-link tag="p" :to="value.path"> {{value.text}}</router-link>  
                 </menu-item>
            </Submenu> 
            <menu-item v-if="!item.hasChilds"
                       name="item.name">
                <router-link tag="p" :to="item.path">  {{item.text}} </router-link>  
            </menu-item>
             </div>
    </Menu>
</template>

<script>

export default {
    props: {
        menuList: {
            type: Array,
            default: function(){
                return []
            }
        }
    },
    data(){
        return {
            theme1: 'dark'
        }
    },
  
}
</script>
