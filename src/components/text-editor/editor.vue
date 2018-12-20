<template>
  <div>
    <!-- quill-editor插件标签 分别绑定各个事件-->
   <quill-editor ref="myTextEditor"
              v-model="content"
              :config="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">
</quill-editor>
    <div class="limit">当前已输入
      <span>{{nowLength}}</span> 个字符，您还可以输入 <span>{{SurplusLength}}</span> 个字符。</div>
    <!-- 文件上传input 将它隐藏-->
    <!-- <el-upload class="upload-demo" :action="qnLocation" :before-upload='beforeUpload' :data="uploadData" :on-success='upScuccess'
      ref="upload" style="display:none">
      <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
    </el-upload> -->

    <Upload :data="datas"
            action="http://localhost:8099/fileServer">
      <!-- type="drag" -->
      <Button type="ghost"
              icon="ios-cloud-upload-outline"> 上传 </Button>
    </Upload>
    </el-table>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      content: "hhh",
      datas: {},
      nowLength: "",
      SurplusLength: "",
      editorOption: {
        debug: "info",
        modules: {
          toolbar: "#toolbar",
          handlers: {
                'image': function (value) {
                  if (value) {
                    console.log('  click >>>> ')
                  } else {
                    console.log(' no click >>>> ')
                    this.quill.format('image', false);
                  }
                }
           }
        },
        placeholder: "Compose an epic...",
        readOnly: true,
        theme: "snow"
      }
    };
  },
  mounted(){
    // console.log( 'mounted >>> ', this.$refs.myTextEditor)
    // let  toolbar = this.editor.getModule('toolbar');
     
    //   toolbar.addHandler('image', () => {
    //     console.log(' click >>>>')
    //     document.getElementsByClassName('ql-image')[0].click();
    //   })
  },
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
      
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    }
  },
   computed: {
        editor() {
      return this.$refs.myTextEditor.quillEditor
    }
    },
    
  components: {
    quillEditor
  }
};
</script>
