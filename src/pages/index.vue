<template>
<div>
  <div>
    <span>Input permission code: </span>
    <input v-model="inputCode" @keyup.enter="search" autofocus/>
    <button @click='search'>Search</button>
  </div>
  <div id="result">{{result}}</div>

  <Tree :permission='permission'></Tree>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mockPermissions } from '../../dummies/mockPermissions';
import { Permission, PermissionNode, CheckStatus } from '../types/Permissions'
import Tree from '../components/tree.vue';
import { checkServerIdentity } from 'tls';

@Component({
  name: 'Index',
  components: {
    Tree
  }
})
export default class Index extends Vue {
  private inputCode = ""
  private permission: Permission = {
    code: '',
    label: 'root',
    children: mockPermissions,
    check: false
  }
  private result = null

  recursiveSearch(code: string, permissions: Permission[]) {
    for(let permission of permissions) {
      if(permission.code === code) return permission;
      const match = this.recursiveSearch(code, permission.children)
      if(match) return match
    }
    return null
  }

  search() {
    if (!this.inputCode) return;
    const match = this.recursiveSearch(this.inputCode, this.permission.children);
    this.result = match ? match.label : 'No Result';
  }

  created() {
    // (window as any).permission = this.permission
  }
}
</script>
