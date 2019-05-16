<template>
  <li class="tree-node">
    <input type='checkbox' @change='onChange' ref='input'/>
    <span class="label">{{ node.label }}</span>
    <ul v-if="node.children && node.children.length">
      <TreeNode v-for="(child, i) in node.children" :node="child" :key='i'></TreeNode>
    </ul>
  </li>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import {Permission, CheckStatus} from '../types/Permissions'
import $ from 'jquery'
const bus: Vue = new Vue()
interface Payload {
  permission: Permission;
  onOff: boolean;
}
@Component({
  name: "TreeNode",
  components: {
    TreeNode
  }
})
export default class TreeNode extends Vue {
  @Prop() private node: Object;
  private selected = false;

  onChange(event) {
    // bus.$emit('changeStatus', {
    //   permission: this.node,
    //   onOff: event.target.checked
    // })
    $('input[type="checkbox"]').change(function(e) {
      var checked = $(this).prop("checked"),
          container = $(this).parent(),
          siblings = container.siblings();

      container.find('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
      });


      function checkSiblings(el) {

        var parent = el.parent().parent(),
            all = true;

        el.siblings().each(function() {
          return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
        });

        if (all && checked) {

          parent.children('input[type="checkbox"]').prop({
            indeterminate: false,
            checked: checked
          });

          checkSiblings(parent);

        } else if (all && !checked) {

          parent.children('input[type="checkbox"]').prop("checked", checked);
          parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
          checkSiblings(parent);

        } else {

          el.parents("li").children('input[type="checkbox"]').prop({
            indeterminate: true,
            checked: false
          });

        }

      }
      checkSiblings(container);
    });
  }

  // traverse(permission: Permission, fn: (permission) => any) {
  //   permission.children.forEach(p => (this as any).traverse(p, fn))
  //   return fn(permission)
  // }
  // isChildNodeOf(permission: Permission) {
  //   let result = false
  //   this.traverse(permission, (p) => {
  //     if(p === this.node) {
  //       result = true
  //     }
  //   })
  //   return result
  // }
  // isParentNodeOf(permission: Permission) {
  //   let result = false
  //   this.traverse(this.node as Permission, (p) => {
  //     if(p === permission) {
  //       result = true
  //     }
  //   })
  //   return result
  // }
  // created() {
  //   bus.$on('changeStatus', (payload: Payload) => {
  //     const { permission, onOff } = payload;
  //     let p = this.node as Permission
  //     if (p === permission) {
  //       this.checkStatus = onOff ? CheckStatus.all : CheckStatus.none;
  //     } else if (this.isChildNodeOf(p)) {
  //       console.log('this.isChildNodeOf')
  //       this.checkStatus = onOff ? CheckStatus.all : CheckStatus.none;
  //     } else if (this.isParentNodeOf(p)) {
  //       console.log('this.isParentNodeOf')
  //       this.checkStatus = onOff ? CheckStatus.part : this.checkStatus;
  //     }
  //     // console.log(this.checkStatus)
  //   })
  // }
  // beforeDestroy() {
  //   bus.$off('changeStatus')
  // }
};
</script>
<style scoped>
input.part {
  background-color: red;
}
</style>