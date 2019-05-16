<template>
<div>
  <div class="tree">
    <ul class="tree-list">
      <TreeNode :node="permission"></TreeNode>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mockPermissions } from '../../dummies/mockPermissions'
import { Permission, PermissionNode, CheckStatus } from '../types/Permissions'
import TreeNode from '../components/TreeNode.vue'

@Component({
  name: "Tree",
  components: {
    TreeNode
  }
})
export default class Tree extends Vue {
  @Prop() private permission: Permission
  traverse(permission: Permission, fn: (permission) => {}) {
    permission.children.forEach(p => (this as any).traverse(p))
    return fn(permission)
  }

  // get checkStatus() {
  //   const status = CheckStatus.none
  //   return this.traverse((this.node as Permission), (p) => p.checkStatus)
  // }
  // set checkStatus(newValue) {
  //   this.traverse((this.node as Permission), (p: Permission) => {
  //     p.checkStatus = newValue ? CheckStatus.all : CheckStatus.none;
  //   })
  // }
}
</script>

<style>
.tree-list ul {
  padding-left: 2rem;
  margin: 6px 0;

}
li {
  list-style:none;
  list-style-type: none;
}

</style>
