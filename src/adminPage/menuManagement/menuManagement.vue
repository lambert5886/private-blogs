<template>
    <layout>
        <Row :gutter="16" :style="{'margin-top': '10px'}">
            <div class="caozuo">
                 <Button type="success" @click="showAddNew">新增</Button>
            </div>
             <div class="caozuo edit">
                 <Button type="warning">修改</Button>
            </div>
             <div class="caozuo">
                 <Button type="error">删除</Button>
            </div>
            
           
        </Row>
         <Modal
            v-model="addNewMenu"
            title="添加菜单"
            width="600"
            @on-ok="ok"
            @on-cancel="cancel">
              <Row :gutter="8">
            <Col span="2">
                &nbsp;
            </Col>
            <Col span="18">
                <Form :model="formItem" :label-width="100">
                    <Row>
                        <FormItem label="菜单ID :">
                            <Input></Input>
                        </FormItem>
                    </Row>
                    
                    <Row :gutter="2">
                      
                        <Col span="12">
                            <FormItem label="菜单 Key:">
                                <Input></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="菜单 Value:">
                                <Input></Input>
                            </FormItem>
                        </Col>

                    </Row>
                    <FormItem label="路径:">
                        <Input></Input>
                    </FormItem>
                    <FormItem label="是否是子菜单:">
                        <Checkbox v-model="single"> </Checkbox>
                    </FormItem>

                    <div class="hasChildren" v-if="single">
                        <FormItem label="父菜单 :">
                           <Select >
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
      formItem: {},
      addNewMenu: false,
      single: false
    };
  },
  methods: {
      showAddNew(){
          this.addNewMenu = true;
      },
      ok(){
          console.log(this.formItem)
      },
      cancel(){

      }
      
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


