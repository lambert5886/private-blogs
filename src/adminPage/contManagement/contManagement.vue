<template>
  <div class="cont">
    <Row :gutter="16" :style="{'margin': '10px 0'}">
      <Col span="3">
      &nbsp;
      </Col>
      <Col span="8">
      <div class="caozuo">
        <Button type="success" @click="showAddNew">新增</Button>
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
      <Table border :columns="articleTitle" :data="articles"></Table>
      </Col>

    </Row>

    <Row>
      <Col span="2"> &nbsp;
      </Col>
      <Col span="18">
      <component :is="current" :saveUrl="url" :data="editData"></component>

      </Col>

    </Row>
  </div>
</template>

<script>
import addEditor from "@/components/text-editor";
import { EventBus } from "@/tools";
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
      this.url = "/content/saveArticle";
    },
    articleEditor(info) {
      this.$router.push({ path: "/admin/contManagement/editor" });
      this.url = "/content/editArticle";

      EventBus.$emit("editArticle", info.row);
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
    },
    deleteArticle(info) {
      let _id = info.row._id;
      let _params = {};
      _params.id = _id;

      this.axios({
        method: "post",
        url: "http://localhost:8099/content/deleteArticle",
        data: _params
      }).then(res => {
        if (res.data.success) {
          alert("删除成功!");
          this.getArticle();
        }
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


