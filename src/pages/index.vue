<template>
<div>
  <div>
    <span>Input permission code: </span>
    <input v-model="inputCode" @keyup.enter="search" autofocus/>
    <button @click='search'>Search</button>
  </div>
  <div id="result">{{result}}</div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mockPermissions } from '../../dummies/mockPermissions';
import { Permission } from '../types/Permissions'

@Component
export default class Index extends Vue {
  private inputCode = ""
  private permissionsRoot: Permission = {
    code: '',
    label: 'root',
    children: mockPermissions,
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
    const match = this.recursiveSearch(this.inputCode, this.permissionsRoot.children);
    this.result = match ? match.label : 'No Result';
  }
}
</script>

<style lang="scss" scoped>
</style>
