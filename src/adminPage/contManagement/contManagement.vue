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
                class="cao-button"
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
    <div v-if="current"
         class="from-wrap">
      <Button style="margin-left: 30px;margin-top:20px;"
              @click="goBackHandle">返回</Button>
      <Row>
        <Col span="2">
        &nbsp;</Col>
        <Col span="18">
        <Form :label-width="120">
          <FormItem label="标题">
            <Input v-model="aticleModel.title"></Input>
          </FormItem>
          <FormItem label="关键词">
            <Input v-model="aticleModel.keyWords"></Input>
          </FormItem>
          <FormItem label="简介">
            <Input v-model="aticleModel.description"></Input>
          </FormItem>
          <FormItem label="标签">
            <Select v-model="aticleModel.tag"
                    style="width:200px">
              <Option v-for="(item, index) in tagList"
                      :value="item.value"
                      :key="item.index">{{ item.title }}</Option>
            </Select>
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>

    <Row :style="{'margin-top': '20px'}">
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
import { EventBus, articleId } from "@/tools";
import urls from "@/pages/common/urlConfig";
export default {
  data() {
    return {
      name: "contManagement",
      current: "addEditor",
      url: "",
      aticleModel: {},
      tagList: [
        {
          value: 0,
          title: "HTML"
        },
        {
          value: 1,
          title: "CSS"
        },
        {
          value: 2,
          title: "JS"
        }
      ],
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
    EventBus.$on("saveArticle", this.saveAritcleHandle);
  },
  methods: {
    goBackHandle() {
      this.$router.push({ path: "/admin/contManagement/list" });
    },
    saveAritcleHandle(info) {
      console.log("save article >>>>", this.aticleModel, info, articleId());
      let _params = {};

      _params.type = "saveArticle";
      let _data = {};
      _data.articleId = articleId();
      _data.tinymceHtml = info;
      let _footInfo = {
        tag: this.aticleModel.tag,
        articleId: _data.articleId,
        time: articleId("-"),
        read: 0,
        love: 0
      };
      _data = Object.assign({}, _data, this.aticleModel, {
        footInfo: _footInfo
      });
      _params.data = _data;

      this.axios({
        method: "post",
        url: urls,
        type: "saveArticle",
        data: _params
      }).then(res => {
        console.log(" 保存 文章 >>> ", res.data);
      });
    },
    showAddNew() {
      this.$router.push({ path: "/admin/contManagement/add" });
      this.url = "saveArticle";
      this.editData = {};
    },
    changepage(info) {},
    articleEditor(info) {
      this.$router.push({ path: "/admin/contManagement/edit" });
      this.url = "editArticle";
      console.log();
      this.current = "addEditor";
      console.log("edit >>>> ", info.row);
      this.editData = info.row;
    },
    getArticle() {
      this.current = "";
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
      _params.data = { id: _id };
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
    console.log("beforeUpdate >>> ", to.params.id);
    if (to.params.id == "list") {
      this.current = "";
    } else {
      this.current = "";
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