<template>
    <layout>
        <Row :gutter="16"
             :style="{'margin-top': '10px'}">
            <div class="caozuo">
                <Button type="success"
                        @click="showAddNew">新增</Button>
            </div>
            <div class="caozuo edit">
                <Button type="warning">修改</Button>
            </div>
            <div class="caozuo">
                <Button type="error">删除</Button>
            </div>

        </Row>
        <Modal v-model="addNewMenu"
               title="添加菜单"
               width="600"
               @on-ok="ok"
               @on-cancel="cancel">
            <Row :gutter="8">
                <Col span="2"> &nbsp;
                </Col>
                <Col span="18">
                <Form :model="formItem"
                      :label-width="100">
                    <Row>
                        <FormItem label="菜单ID :">
                            <Input v-model="formItem.id"></Input>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="菜单类别 :">
                            <Select v-model="formItem.menuType">
                                <Option v-for="item in menuType"
                                        :value="item.type"
                                        :key="item.value">{{ item.text }}</Option>
                            </Select>
                        </FormItem>
                    </Row>

                    <Row :gutter="2">

                        <Col span="12">
                        <FormItem label="菜单 title:">
                            <Input v-model="formItem.title"></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="菜单 Value:">
                            <Input v-model="formItem.value"></Input>
                        </FormItem>
                        </Col>

                    </Row>
                    <FormItem label="路径:">
                        <Input v-model="formItem.path"></Input>
                    </FormItem>
                    <FormItem label="是否是子菜单:">
                        <Checkbox v-model="formItem.isChildren"
                                  @on-change="getParent"> </Checkbox>
                    </FormItem>

                    <div class="hasChildren"
                         v-if="formItem.isChildren">
                        <FormItem label="父菜单:">
                            <Select v-model="formItem.parentId">
                                <Option v-for="item in parentList"
                                        :value="item._id"
                                        :key="item.parentId">{{ item.title }}</Option>
                            </Select>
                        </FormItem>
                    </div>

                </Form>
                </Col>
            </Row>
        </Modal>

    </layout>
</template>

<script>
export default {
  data() {
    return {
      menuType: [{ type: 0, text: "前端" }, { type: 1, text: "后端" }],
      formItem: {
        isChildren: false
      },
      addNewMenu: false,
      single: false,
      parentList: []
    };
  },
  methods: {
    showAddNew() {
      this.addNewMenu = true;
    },
    ok() {
      console.log(this.formItem);
      let params = this.formItem;
      
      this.axios({
        method: "post",
        url: "http://localhost:8099/menu/saveMenu",
        data: params
      }).then(res => {
        console.log(res, "menu 响应《》《》《》《》");
      });
    },
    getParent() {
    
      if (this.formItem.isChildren) {
        this.axios({
          method: "get",
          url: "http://localhost:8099/menu/getMenu"
        }).then(res => {
          console.log(res, "get Menu");
          this.parentList.push(...res.data.data);
          console.log("parentlist", this.parentList);
        });
      }
    },
    cancel() {},
 
  },
 
};
</script>

<style scoped>
div.caozuo {
  float: left;
}
.edit {
  margin: 0 5px;
}
</style>


