<template>
  <ul class="tw-list">
    <li class="tw-list-item"
      v-if="filterText===''||item[textKey].indexOf(filterText)!==-1"
      :class="{xdisabled:item[disabledKey],xselected:multiple?value.indexOf(item[valueKey])!==-1:value===item[valueKey]}"
      v-for="(item, index) in items"
      :key="index" @click="selectItem(item)">
      <slot v-bind="item">{{item.name}}<i v-if="multiple" class="tw-font xselect"></i></slot>
    </li>
    <span v-if="link && labelVisible" class="tw-list-label" ref="listLabel"><slot name="listLabel" v-bind="selectedItem">{{ labelText }}</slot></span>
  </ul>
</template>

<script>
import selectList from '@mixins/select-list'

export default {
  name: 'twList',
  mixins: [selectList],
  props: {
    filterText: {
      type: String,
      default: ''
    },
    link: {
      type: String
    }
  },
  mounted () {
    if (this.link) {
      this.displayElement = document.querySelector(this.link)
      if (!this.displayElement) throw Error(`使用属性link未查找到任何元素，请确定link指定的选择器是否正确并确保link指向的元素已经在页面中渲染!`)
      if (typeof this.displayElement.value !== 'undefined') {
        this.displayElement.value = this.labelText
        this.labelVisible = false
      } else {
        this.displayElement.appendChild(this.$refs.listLabel)
      }
    }
  },
  watch: {
    value () {
      this.displayElement.value = this.labelText
    }
  }
}
</script>

<style lang="scss">
  @import "list.scss";
</style>
