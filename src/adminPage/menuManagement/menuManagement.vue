<template>
    <layout>
        <Row :gutter="16"
             :style="{'margin': '10px 0'}">
            <Col span="3">
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

        <Row :gutter="16">
            <Col span="3">
            &nbsp;
            </Col>
            <Col span="18">
            <Table border
                   :columns="menuListTitle"
                   :data="menuList"></Table>
            </Col>
        </Row>

        <Modal v-model="addNew"
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
      addNew: false,
      single: 'add',
      eidtId: null,
      menuListTitle: [
        {
          title: "ID",
          key: "id"
        },
        {
          title: "类别",
          key: "menuType",
          render: (h, params) => {
             
              if(params.row.menuType == '0'){
                  return h('span', {}, '前端');
              }else{
                   return h('span', {}, '后端');
              }
          }
        },
        {
          title: "名称",
          key: "title"
        },
        {
          title: "标识",
          key: "value"
        },
        {
          title: "路径",
          key: "path"
        },

        {
          title: "子菜单",
          key: "childrenList",
          render: (h, params) => {
           
            if (params.row.childrenList.length > 0) {
              return h("span", {}, '是');
            }else {
                return h('span', {}, '否')
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
      menuList: [],
      parentList: []
    };
  },
  mounted() {
    this.getMenus();
  },
  methods: {
    showAddNew() {
      this.addNew = true;
    },
    showEditMenu(info){
      this.single = 'edit';
      let _id = info.row._id;
      this.eidtId = _id;
      this.addNew = true;

      this.formItem = Object.assign({}, info.row);

      
    },
    getMenus() {
      this.axios({
        method: "get",
        url: "http://localhost:8099/menu/getMenu"
      }).then(res => {
        console.log(res, "get Menu");
        this.menuList = [];
        this.menuList.push(...res.data.data);
      });
    },
    editMenu(id){
        let _opts = this.formItem;

        let _params = {};
            for( let keys in _opts){
              console.log(keys.indexOf('_'))
              if(keys.indexOf('_') < 0){
                _params[keys] = _opts[keys]
              }
            }
            console.log(_params)
            _params._id = _opts._id;
           
        this.axios({
            method: 'post',
            url: 'http://localhost:8099/menu/editMenu',
            data: _params
        }).then( (res) => {
            console.log(res.data);
        });
    },
    addNewMenu(){
          let params = this.formItem;

      this.axios({
        method: "post",
        url: "http://localhost:8099/menu/saveMenu",
        data: params
      }).then(res => {
        console.log(res, "menu 响应 ");
      });

    },
    ok() {

      if(this.single == 'add'){
        this.addNewMenu();
      }
      if(this.single == 'edit'){
        this.editMenu();
      }
  

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
    cancel() {}
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


