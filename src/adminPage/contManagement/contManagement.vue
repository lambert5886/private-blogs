<template>
  <div class="cont">
    <Row :gutter="16"
         :style="{'margin-top': '10px'}">
      <Col span="3">
      &nbsp;
      </Col>
      <Col span="8">
      <div class="caozuo">
        <Button type="success"
                @click="showAddNew">新增</Button>
      </div>
      <div class="caozuo edit">
        <Button type="warning"
                @click="articleEditor">修改</Button>
      </div>
      <div class="caozuo">
        <Button type="error"
                @click="getArticle">删除</Button>
      </div>
      </Col>
      <Col span="3">
      &nbsp;
      </Col>

    </Row>
    <Row>
      <Col span="2">
      &nbsp;
      </Col>
      <Col span="18">
      <Table border
             :columns="articleTitle"
             :data="articles"></Table>
      </Col>

    </Row>

    <Row>
      <Col span="2"> &nbsp;
      </Col>
      <Col span="18">
      <component :is="current"
                 :saveUrl="url"
                 :data="editData"></component>

      </Col>

    </Row>
  </div>
</template>

<script>
import addEditor from "@/components/text-editor";
import { EventBus } from '@/tools';
export default {
  data() {
    return {
      current: "",
      url: "",
      articleTitle: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "关键字",
          key: "keyWords"
        },
        {
          title: "简介",
          key: "description"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {

           
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showAddNew();
                    }
                  }
                },
                "新增"
              ),
                 h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                   style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      console.log(params)
                      this.articleEditor(params);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      articles: [],
      editData: {},
      editArticle: {

      }
    };
  },
  mounted() {
    this.getArticle();
    EventBus.$on('changeArticle', this.getArticle);
  },
  methods: {
    showAddNew() {
      this.$router.push({ path: "/admin/contManagement/add" });
      this.url = "/content/saveArticle";
    },
    articleEditor(info) {
      this.$router.push({ path: "/admin/contManagement/editor" });
      this.url = "/content/editArticle";
    
 
      EventBus.$emit('editArticle', info.row);
    
    },
    getArticle() {
      let params = {
        title: "123"
      };

      this.axios({
        method: "get",
        url: "http://localhost:8099/content/article",
        data: params
      }).then(res => {
        this.articles = [];
      
        this.articles.push(...res.data.data);
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
   
    if (to.params.id == "add") this.current = addEditor;

    next();
  },
  components: {
    addEditor
  }
};
</script>

<style scoped>
.cont {
}

div.caozuo {
  float: left;
  margin-left: 15px;
  margin-bottom: 10px;
}
.edit {
}
</style>


