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
          <detail>
            <readInfo slot="footInfo"
                      :readInfo="read"></readInfo>
          </detail>
          <detail>
            <readInfo slot="footInfo"
                      :readInfo="read"></readInfo>
          </detail>
          </Col>
        </Row>
        <Row :gutter="3"
             :style="{'margin-top': '15px'}">
          <Col span="24">
          <Page :total="10"></Page>
          </Col>
        </Row>

      </content>
      <Sider :style="{'min-width': '400px'}"
             class="sider-wrap"
             hide-trigger>
        <sideList></sideList>
      </Sider>
    </Layout>

  </div>
</template>

<script>
import card from "@/components/card";
import sideList from "@/pages/sidebar";
import detail from "@/components/detail";
import readInfo from "@/components/readInfo";
import urls from "@/pages/common/urlConfig";
import { EventBus } from "@/tools";
console.log("readInfo >>> ", readInfo);
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
    EventBus.$on('goToDetail', this.goDetailHandle)
    this.getArticle();
    
  },
  beforeUpdate() {
    console.log(this.$route.params.id, " id >>>> ");
  },
  methods: {
    goDetailHandle(info){
      console.log(" get Info >>> ", info);
    },
    getArticle() {
      let _params = {};
      _params.type = "getArticles";

      this.axios({
        method: "get",
        url: urls,
        params: _params
      }).then(res => {
        console.log(" 响应 >>> ", res);
        this.cardLists = res.data.data;
      });
    }
  },
  // [{
  //                 title: '标题标题',
  //                 description: '内容简介内容简介',
  //                 imgSrc: require('@/assets/b04.jpg'),
  //                 path: '',
  //                 linkTitle: '阅读原文'
  //             },
  //           ]

  computed: {},
  components: {
    card,
    sideList,
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

