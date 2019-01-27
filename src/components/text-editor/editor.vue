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
    <form action="http://localhost:8099/fileServer"
          method="post"
          enctype="multipart/form-data"
          id="uploadFormMulti">
      <input style="display: none"
             :id="uniqueId"
             type="file"
             name="avator"
             multiple
             accept="image/jpg,image/jpeg,image/png,image/gif"
             @change="uploadImg('uploadFormMulti')">
      <!--style="display: none"-->
    </form>

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
import { reject } from "async";

export default {
  data() {
    return {
      content: "hhh",
      datas: {},
      nowLength: "",
      SurplusLength: "",
      uniqueId: "uniqueId",
      editorOption: {
        debug: "info",
        modules: {
          toolbar: "#toolbar"
        },
        placeholder: "Compose an epic...",
        readOnly: true,
        theme: "snow"
      }
    };
  },
  mounted() {
    var vm = this;
    var imgHandler = async function(image) {
      vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection();
      if (image) {
        var fileInput = document.getElementById(vm.uniqueId); //隐藏的file文本ID
        fileInput.click(); //加一个触发事件
      }
    };
    vm.$refs.myTextEditor.quill
      .getModule("toolbar")
      .addHandler("image", imgHandler);
  },
  methods: {
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html;
    },
    uploadImg: function(id) {
      var vm = this;
      vm.imageLoading = true;
      let _form = document.getElementById(id);
      var formData = new FormData(_form);
      try {
        const url = vm.uploadImgReq(formData); // 自定义的图片上传函数
        console.log("urls >>>> ", url);
        if (url != null && url.length > 0) {
        } else {
          // vm.$message.warning("图片增加失败");
        }
        document.getElementById(vm.uniqueId).value = "";
      } catch ({ message: msg }) {
        document.getElementById(vm.uniqueId).value = "";
        // vm.$message.warning(msg);
      }
      vm.imageLoading = false;
    },
    uploadImgReq(data) {
      let url = null;
      let vm = this;
      this.axios({
        method: "post",
        url: "http://localhost:8099/fileServer",
        headers: { "content-type": "multipart/form-data" },
        data: data
      }).then(res => {
        console.log("res", res);
        url = res.data.url;

        var value = url;
        vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection();
        value =
          value.indexOf("http") != -1 ? value : "http://localhost:8099" + value;
        vm.$refs.myTextEditor.quill.insertEmbed(
          vm.addImgRange != null ? vm.addImgRange.index : 0,
          "image",
          value
        );
      });
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },

  components: {
    quillEditor
  }
};
</script>
