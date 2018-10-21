<template>
    <div class="list">
        <Layout>
            <content>
                <card v-for="(item, index) in cardLists"
                      :key="index"
                      :item="item"></card>
            </content>
        </Layout>

    </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {
      cardLists: []
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.axios({
        method: "get",
        url: "http://localhost:8099/content/article"
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
    card
  }
};
</script>
<style scoped>
.list {
  clear: both;
}
</style>

