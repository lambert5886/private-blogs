<template>
  <div class="cont">
    <Row v-if="!current"
         :gutter="16"
         :style="{'margin': '10px 0'}">
      <Col span="2">
      &nbsp;
      </Col>
      <Col span="8">
      <div class="caozuo">
        <Button type="success"
                @click="showAddNew">新增</Button>
 
      </div>

      </Col>
      <Col span="3">
      &nbsp;
      </Col>

    </Row>
    <Row v-if="!current">
      <Col span="2">
      &nbsp;
      </Col>
      <Col span="18">
      <Table border
             :columns="articleTitle"
             :data="articles"></Table>
       <Page :total="articles.length "
            :page-size="3"
            :style="{'margin-top': '10px'}"
            @on-change="changepage"></Page>

      </Col>

    </Row>

    <Row :style="{'margin-top': '20px'}" >
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
import { EventBus } from "@/tools";
import urls from "@/pages/common/urlConfig";
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
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      console.log(params);
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
                      this.deleteArticle(params);
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
      editArticle: {}
    };
  },
  mounted() {
    this.getArticle();
    EventBus.$on("changeArticle", this.getArticle);
  },
  methods: {
    showAddNew() {
      this.$router.push({ path: "/admin/contManagement/add" });
      this.url = "saveArticle";
      this.editData = {};
    },
    changepage(info){

    },
    articleEditor(info) {
      this.$router.push({ path: "/admin/contManagement/edit" });
      this.url = "editArticle";
      console.log()
      this.current = 'addEditor';
      console.log('edit >>>> ', info.row)
       this.editData = info.row;
    },
    getArticle() {
      this.current = '';
      let _params = {};
      _params.type = "getArticles";

      this.axios({
        method: "get",
        url: urls,
        params: _params
      }).then(res => {
        this.articles = [];

        this.articles.push(...res.data.data);
      });
    },
    deleteArticle(info) {
      let _id = info.row._id;
      let _params = {};
      _params.data = {id: _id};
      _params.type = "deleteArticle";
      this.axios({
        method: "post",
        url: urls,
        data: _params
      }).then(res => {
        if (res.data.success) {
          this.$Notice.success({
            title: "删除成功!"
          });

          this.getArticle();
        }
      });
    }
  },

  beforeRouteUpdate(to, from, next) {
    console.log('beforeUpdate >>> ',to.params.id)
    if (to.params.id == "list"){
      this.current = '';
    } else {
      this.current = '';
      this.current = addEditor;
    }

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
  /* margin-left: 15px; */
  margin-bottom: 10px;
}

.edit {
}
</style>