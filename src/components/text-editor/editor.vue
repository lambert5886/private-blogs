<template>
    <div class='tinymce'>
        <Form :label-width="100" label-position="left">
            <FormItem label="标题">
                <Input v-model="article.title"></Input>
            </FormItem>
            <FormItem label="关键词">
                <Input v-model="article.keyWords"></Input>
            </FormItem>
            <FormItem label="简介">
                <Input v-model="article.description"></Input>
            </FormItem>
        </Form>

        <editor id='tinymce' v-model='article.tinymceHtml' :init='init'></editor>
        <div v-html='article.tinymceHtml'></div>
        <Button type="success" @click="saveArticle">保存</Button>
    </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";

export default {
  name: "tinymce",
  props: {
      id: {
          type: String,
      },
      saveUrl: {
          type: String
      }
  },
  data() {
    return {
      article: {
        tinymceHtml: "请输入内容",
      },  
      
      init: {
        language_url: "/static/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/skins/lightgray",
        height: 300,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false
      }
    };
  },
  mounted() {
    tinymce.init({});
   
  },
  watch: {
      '$route': function(){
          console.log(this.$route.params.id, 'route')
          console.log(this. saveUrl,  'route url')
      }
  },
  methods: {
      saveArticle(){
         
          console.log(this.article)
          console.log(this.saveUrl, '提交地址')
          let params = this.article;
          let _url ='http://localhost:8099' + this.saveUrl;
          this.axios({
              method: 'post',
              url: _url,
              data: params,
          }).then( (res) => {
              console.log('响应 res >>> ', res.data)
          })
      }
  },
  components: { Editor }
};
</script>