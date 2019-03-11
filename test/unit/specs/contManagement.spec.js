import Vue from 'vue';
import cont from "@/adminPage/contManagement/contManagement.vue";
import axios from 'axios';
import iView from 'iview';
Vue.prototype.axios = axios;
Vue.use(axios);
Vue.use(iView);
import {
  mount,
  shallowMount,
  createWrapper
} from "@vue/test-utils";

const $route = {
  path: '/some/path'
}
 const contVm = mount(cont, {
    mocks: {
      $route
    },
    attachToDocument: true
  });

console.log('contvm >>>> ', contVm.find('.caozuo'))

describe('cont mng >>>   ', () => {


  it('cont 函数调用 >>>> ', () => {
    const mockFn = jest.fn();
    contVm.setMethods({
      showAddNew: mockFn
    });
     
    contVm.find('.cao-button').trigger('click');
    expect(mockFn).toBeCalled();
  })
})
