import {mount} from "@vue/test-utils";
import $ from 'jquery';
import Index from "../../src/pages/index.vue";
import { mockPermissions } from '../../dummies/mockPermissions';

describe("index spec", () => {
  const wrapper = mount(Index);
  const vm: any = wrapper.vm;
  it("should render proper", () => {
    // expect(wrapper.element).toMatchSnapshot();
  });

  it("should init properly", () => {
    expect(vm.inputCode).toBe('')
    expect(vm.result).toBe(null)
    const permissionRoot = vm.permissionsRoot
    expect(permissionRoot)
    expect(JSON.stringify(permissionRoot)).toBe(JSON.stringify({
      code: '',
      label: 'root',
      children: mockPermissions,
    }))
  })

  it('search no found', () => {
    vm.inputCode = '  '
    vm.search()
    expect(vm.result).toBe('No Result')

    vm.inputCode = ''
    vm.search()
    expect(vm.result).toBe('No Result')
  })

  it('search found', () => {
    vm.inputCode = 'code B-1'
    vm.search()
    expect(vm.result).toBe('label B-1')
  })

});
