<template>
  <div class="list">
    <Layout>
      <content class="content-wrap">
        <Row :gutter="3">
          <Col span="24">
          <card v-for="(item, index) in cardLists"
                :key="index"
                :item="item"></card>
          </Col>
        </Row>
        <Row :gutter="3"
             :style="{'padding-top': '15px'}">
          <p class="newAtricle">
            最新文章
          </p>
          <Col span="24">
          <div class="details"
               v-for="(item, index) in cardLists"
               :key="index">
            <detail :detail="item">
              <readInfo slot="footInfo"
                        :readInfo="read"></readInfo>
            </detail>
          </div>

          </Col>
        </Row>
        <Row :gutter="3"
             :style="{'margin-top': '15px'}">
          <Col span="24">
          <Page :total="10"></Page>
          </Col>
        </Row>
      </content>
    </Layout>
  </div>
</template>

<script>
import card from "@/components/card";
import detail from "@/components/detail";
import readInfo from "@/components/readInfo";
import urls from "@/pages/common/urlConfig";

export default {
  data() {
    return {
      cardLists: [],
      read: {
        tag: "html",
        time: "2019-01-12",
        read: "266",
        love: "555",
        articleId: "11111111"
      }
    };
  },
  mounted() {
    EventBus.$on("goToDetail", this.goDetailHandle);
    EventBus.$on("goToList", this.goToListHandle);
    this.getArticle();
  },
  beforeUpdate() {
    console.log(this.$route.params.id, " id >>>> ");
  },
  methods: {
    goDetailHandle(info) {
      console.log(" get Info >>> ", info);
      this.$router.push({ path: "/aritcle/detail/" });
    },
    goToListHandle(info) {
      this.$router.push({ path: "/aritcle/list/" });
    },
    getArticle() {
      let _params = {};
      _params.type = "getArticles";

      this.axios({
        method: "get",
        url: urls,
        params: _params
      }).then(res => {
        this.cardLists = res.data.data;
      });
    }
  },
  destroyed() {
    EventBus.$off("goToDetail");
    EventBus.$off("goToList");
  },

  computed: {},
  components: {
    card,
    detail,
    readInfo
  }
};
</script>
<style scoped>
.list {
  clear: both;
}
.layout {
  border: 1px solid red;
}
.content-wrap {
  padding: 10px;
  padding-left: 40px;
  width: 100%;
  height: 100%;
}
.sider-wrap {
  background: #f5f7f9;
  padding: 10px 25px;
}

.newAtricle {
  font-size: 18px;
  font-weight: 600;
}
</style>

