<template>
  <layout>
    <Row :gutter="16"
         :style="{'margin': '10px 0'}">
      <Col span="3">&nbsp;</Col>
      <Col span="8">
      <div class="caozuo">
        <Button type="success"
                @click="showAddNew">新增</Button>

      </div>
      </Col>
      <Col span="3">&nbsp;</Col>
    </Row>
    <Row :gutter="16">
      <Col span="3">&nbsp;</Col>
      <Col span="18">
      <Table border=""
             :columns="menuListTitle"
             :data="menuList"></Table>
      </Col>
    </Row>
    <Row :gutter="16"
         :style="{'margin-top': '10px'}">
      <Col span="3">&nbsp;</Col>
      <Col span="18">
      <Page :total="menuListBase.length"
            :page-size="3"
            @on-change="changepage"></Page>
      </Col>
    </Row>

    <!--添加菜单 start-->
    <Modal v-model="addNew"
           title="添加菜单"
           width="600"
           @on-ok="ok"
           @on-cancel="cancel">
      <Row :gutter="8">
        <Col span="2">&nbsp;</Col>
        <Col span="18">
        <Form :model="formItem"
              :label-width="100">
          <Row>
            <FormItem label="菜单ID :">
              <Input v-model="formItem._id"
                     disabled></Input>
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
          <Row>
            <FormItem label="路径:">
              <Input v-model="formItem.path"> </Input>
            </FormItem>
          </Row>

          <FormItem label="是否是子菜单:">
            <Checkbox v-model="formItem.isChildren"
                      @on-change="getParent"></Checkbox>
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

    <!--添加菜单 end-->
  </layout>
</template>

<script>
import { EventBus } from "@/tools";
import menus from "@/components/menu";
import urls from "@/pages/common/urlConfig";
export default {
  data() {
    return {
      menuType: [{ type: 0, text: "前端" }, { type: 1, text: "后端" }],
      formItem: {
        isChildren: false,
        childrenList: []
      },
      addNew: false,
      single: "add",
      eidtId: null,
      menuListTitle: [
        {
          title: "菜单ID",
          key: "_id",
          width: 100,
          render: (h, params) => {
            let _id = params.row._id;

            let _start = _id.substring(0, 4);
            let _end = _id.substring(_id.length - 4, _id.length);

            let _filteredId = _start + "..." + _end;
            return h("span", {}, _filteredId);
          }
        },
        {
          title: "类别",
          key: "menuType",
          width: 80,
          render: (h, params) => {
            if (params.row.menuType == "0") {
              return h("span", {}, "前端");
            } else {
              return h("span", {}, "后端");
            }
          }
        },
        {
          title: "名称",
          key: "title",
          width: 80
        },
        {
          title: "标识",
          key: "value",
          width: 80
        },
        {
          title: "路径",
          key: "path",
          width: 80
        },
        {
          title: "父菜单",
          key: "parentId",
          width: 100,
          render: (h, params) => {
            let _id = params.row.parentId;
            console.log(_id, "_id");
            if (_id != undefined) {
              let _start = _id.substring(0, 4);
              let _end = _id.substring(_id.length - 4, _id.length);

              let _filteredId = _start + "..." + _end;
              return h("span", {}, _filteredId);
            } else {
              return h("span", {}, "无");
            }
          }
        },
        {
          title: "子菜单",
          key: "isChildren",

          render: (h, params) => {
            if (params.row.isChildren) {
              return h("span", {}, "是");
            } else {
              return h("span", {}, "否");
            }
          }
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
                      this.showEditMenu(params);
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
                      this.deleteMenu(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      menuList: [],
      menuListBase: [],
      parentList: [],
      currentPage: 1,
      pageSize: 3
    };
  },
  created() {
    this.getMenus();
  },
  mounted() {
    this.changepage();
  },
  methods: {
    showAddNew() {
      this.addNew = true;
    },
    showEditMenu(info) {
      this.single = "edit";
      let _id = info.row._id;
      this.eidtId = _id;

      this.formItem = Object.assign({}, info.row);
      this.addNew = true;
    },
    getMenus() {
      this.axios({
        method: "get",
        url: urls,
        params: {
          method: "get",
          type: "getMenu",
          data: {}
        }
      }).then(res => {
        this.menuList = [];
        let _data = res.data.data;
        this.menuListBase = [];
        for (let i = 0; i < _data.length; i++) {
          if (_data[i].childrenList.length) {
            for (let k = 0; k < _data[i].childrenList.length; k++) {
              this.menuListBase.push(_data[i].childrenList[k]);
            }
          }
        }

        this.menuListBase.push(...res.data.data);
        this.changepage();
      });
    },

    editMenu(id) {
      let _opts = this.formItem;
      delete _opts._index;
      delete _opts._rowKey;
      console.log("edit menu >>>>  ", _opts);
      let _params = {
        type: "editMenu",
        data: _opts
      };
      this.axios({
        url: urls,
        data: _params
      }).then(res => {
        if (res.data.success) {
          this.$Notice.success({
            title: "编辑菜单成功!"
          });
          this.getMenus();
        }
      });
    },
    deleteMenu(info) {
      let _data = info.row;
      let _params = {};
      _params.method = "post";
      _params.type = "deleteMenu";
      _params.data = _data;
      this.axios({
        url: urls,
        data: _params
      }).then(res => {
        if (res.data.success) {
          this.$Notice.success({
            title: "删除成功!"
          });
          this.getMenus();
        }
      });
    },
    addNewMenu() {
      let _data = this.formItem;

      let _params = {};

      _params.type = "saveMenu";
      _params.data = _data;

      this.axios({
        method: "post",
        url: urls,
        data: _params
      }).then(res => {
        if (res.data.success) {
          this.$Notice.success({
            title: "添加菜单成功!"
          });
          this.formItem = Object.assign(
            {},
            { isChildren: false },
            { childrenList: [] }
          );
          this.getMenus();
        }
      });
    },
    ok() {
      if (this.single == "add") {
        this.addNewMenu();
      }
      if (this.single == "edit") {
        this.editMenu();
      }
    },
    getParent() {
      if (this.formItem.isChildren) {
        let _params = {};

        _params.type = "getMenu";

        this.axios({
          method: "get",
          url: urls,
          params: _params
        }).then(res => {
          this.parentList = [];

          this.parentList.push(...res.data.data);
          console.log("parentlist", this.parentList);
        });
      }
    },
    cancel() {},
    changepage(info) {
      if (info) {
        this.menuList = [];
        let _start = (info - 1) * this.pageSize;
        let _end = _start + this.pageSize;
        this.menuList.push(...this.menuListBase.slice(_start, _end));
      } else {
        let _menus = this.menuListBase;

        this.menuList.push(...this.menuListBase.slice(0, this.pageSize));
      }
    }
  },
  components: {
    menus
  }
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