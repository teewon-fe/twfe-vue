<template>
  <ul class="tw-tree">
    <li class="tw-tree-node"
      :class="{
        xselected: isSelected(node),
        xportion: isPortion(node),
        xleaf: !node[childrenKey],
        xdisabled: isDisabled(node)
      }"
      v-for="(node, index) in data"
      :key="`${level}-${index}`"
      @click.stop="clickNode(node)">
      <slot :node="node">
        <div class="tw-tree-content">
          <span v-if="node[childrenKey]"
            class="tw-tree-expandicon"
            :class="{xexpanded: isExpanded(node)}"
            :style="{width: `${30+level*indent}px`}"
            @click.stop="toggleCollapse(node)">
          </span>
          <span :style="{'padding-left':`${level*indent}px`}">{{node[nameKey]}}</span>
          <i v-if="selectIconVisible && !isDisabled(node) && (!onlySelectLeaf || (multiple ? (!node[childrenKey] || node[childrenKey].length > 0) : !node[childrenKey]))"
            class="tw-tree-selicon"
            :class="{xmultiple: multiple}"
            @click.stop="selectNode(node)">
          </i>
        </div>
      </slot>
      <template
        v-if="node[childrenKey] && node[childrenKey].length>0">
        <tw-tree
          v-show="isExpanded(node)"
          :level="level+1"
          :value="value"
          :data="node[childrenKey]"
          :children-key="childrenKey"
          :name-key="nameKey"
          :value-key="valueKey"
          :disabled-values="disabledValues"
          :expanded-values="expandedValues"
          :multiple="multiple"
          :only-select-leaf="onlySelectLeaf"
          :select-icon-visible="selectIconVisible"
          :indent="indent"
          :click-node-is="clickNodeIs"
          is-child
          :parent="self"
          :subTreeNode="node"
          :root="treeRoot">
        </tw-tree>
      </template>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'tw-tree',

  props: {
    // 选中的节点
    value: [String, Array],

    // 树对应的数据
    data: {
      type: Array,
      default () {
        return []
      }
    },

    // 子节点对应的key
    childrenKey: {
      type: String,
      default: 'children'
    },

    // 节点名称对应的key
    nameKey: {
      type: String,
      default: 'name'
    },

    // 节点值对应的key
    valueKey: {
      type: String,
      default: 'value'
    },

    // 禁用的节点值
    disabledValues: {
      type: Array,
      default () {
        return []
      }
    },

    // 节点是否全部展开
    defaultExpandAll: {
      type: Boolean,
      default: false
    },

    // 默认展开的层级
    defaultExpandedLevels: {
      type: Array,
      default () {
        return []
      }
    },

    // 默认展开的节点值
    expandedValues: {
      type: Array,
      default () {
        return []
      }
    },

    // 是否为多选
    multiple: {
      type: Boolean,
      default: false
    },

    // 仅可选择叶子节点
    onlySelectLeaf: {
      type: Boolean,
      default: false
    },

    // 每个子树缩进宽度
    indent: {
      type: Number,
      default: 10
    },

    // 点击节点的操作是： select-选择操作 expand-展开或收起操作
    clickNodeIs: {
      type: String,
      default: 'select'
    },

    // 父子联动的
    linked: {
      type: Boolean,
      default: true
    },

    // 是否显示选择图标
    selectIconVisible: {
      type: Boolean,
      default: true
    },

    isChild: {
      type: Boolean,
      default: false
    },

    root: {
      type: Object,
      default: null
    },

    subTreeNode: {
      type: Object,
      default: null
    },

    parent: {
      type: Object,
      default: null
    },

    level: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      self: this,
      treeRoot: null,
      expandedVals: [],
      result: []
    }
  },

  computed: {
    // 点击节点的最终操作
    resultClickNodeIs () {
      if (this.onlySelectLeaf) {
        return 'expand'
      } else {
        return this.clickNodeIs
      }
    },

    // 禁用的节点值
    disabledVals () {
      if (this.isChild) {
        return this.treeRoot.disabledVals
      } else {
        let result = []

        this.$ui.tree.nodes(this.data, this.childrenKey).forEach(item => {
          const value = item[this.valueKey]

          if (this.disabledValues.includes(value)) {
            if (item[this.childrenKey]) {
              result = result.concat(this.$ui.tree.nodes([item], this.childrenKey).map(item => item[this.valueKey]))
            } else {
              result.push(value)
            }
          }
        })

        result.sort()

        return [...new Set(result)]
      }
    }
  },

  methods: {
    /**
    * 功能: 是否选中
    * @params {Object} node 节点
    */
    isSelected (node) {
      if (this.multiple) {
        if (node[this.childrenKey]) {
          if (this.onlySelectLeaf) {
            let leafTotal = this.$ui.tree.total([node], 'leaf')
            return leafTotal > 0 && leafTotal === this.getSelectedChildrenCount(node[this.childrenKey])
          } else {
            return this.value.includes(node[this.valueKey])
          }
        } else {
          return this.value.includes(node[this.valueKey])
        }
      } else {
        return this.value === node[this.valueKey]
      }
    },

    /**
    * 功能: 计算节点的所有子节点是否已全部选中（排除禁用的 ）
    * @params {Object} node 节点
    */
    childrenAreAllSelected (node) {
      if (node[this.childrenKey]) {
        if (this.isSelected(node)) {
          return true
        } else {
          let total = this.$ui.tree.total(node[this.childrenKey], this.onlySelectLeaf ? 'leaf' : undefined)
          let selectedCount = this.computeChild('selectedCount', node)
          let disabledCount = this.computeChild('disabledCount', node)

          if (selectedCount + disabledCount === total) {
            return true
          } else {
            return false
          }
        }
      } else {
        return true
      }
    },

    /**
    * 功能: 计算子节点的状态
    * @params {String} status 状态类型
    * |—— 'selectedCount'-计算选中的子节点个数 'disabledCount'-计算禁用的子节点个数 'hasDisabledChild'-计算是否有禁用的子节点
    * @params {Object} node 节点
    * @params {Boolean} includeSelf 是否包括节点自身
    */
    computeChild (type, node, includeSelf) {
      let result = ['selectedCount', 'disabledCount'].includes(type) ? 0 : false
      let vm = this
      let initData = includeSelf ? [node] : node[vm.childrenKey]

      let fn = function (nodeChildren) {
        for (let i = 0; i < nodeChildren.length; i++) {
          const item = nodeChildren[i]

          if (type === 'selectedCount') {
            if (vm.value.includes(item[vm.valueKey])) {
              result++
            }
          } else if (type === 'disabledCount') {
            if (vm.disabledVals.includes(item[vm.valueKey])) {
              if (vm.onlySelectLeaf) {
                if (!item[vm.childrenKey]) {
                  result++
                }
              } else {
                result++
              }
            }
          } else if (type === 'hasDisabledChild') {
            if (vm.disabledVals.includes(item[vm.valueKey])) {
              result = true
              return
            }
          }

          if (item[vm.childrenKey]) {
            fn(item[vm.childrenKey])
          }
        }
      }

      if (initData) {
        fn(initData)
      }

      return result
    },

    /**
    * 功能: 是否部份选中
    * @params {Object} node 节点
    */
    isPortion (node) {
      if (node[this.childrenKey]) {
        return this.getSelectedChildrenCount(node[this.childrenKey]) > 0
      } else {
        return false
      }
    },

    /**
    * 功能: 是否禁用
    * @params {Object} node 节点
    */
    isDisabled (node) {
      return this.disabledVals.includes(node[this.valueKey]) || (!this.linked && node[this.childrenKey])
    },

    /**
    * 功能: 是否展开
    * @params {Object} node 节点
    */
    isExpanded (node) {
      return this.treeRoot.expandedVals.includes(node[this.valueKey])
    },

    /**
    * 功能: 初始化树渲染时扩展项的值
    * @param {Type} name 参数描述
    */
    initExpandedValues () {
      if (this.defaultExpandAll) {
        this.expandedVals = this.$ui.tree.branches(this.data).map(item => item[this.valueKey])
      } else if (this.defaultExpandedLevels.length > 0) {
        this.expandedVals = this.$ui.tree.branches(this.data, this.defaultExpandedLevels).map(item => item[this.valueKey])
        this.expandedVals = [...new Set(this.expandedVals, this.expandedValues)]
      } else {
        this.expandedVals = JSON.parse(JSON.stringify(this.expandedValues))
      }

      this.treeRoot.$emit('update:expandedValues', this.expandedVals)
    },

    /**
    * 功能: 获取节点选中的子(后代)节点数
    * @param {Array} nodeChildren 节点的所有子节点
    */
    getSelectedChildrenCount (nodeChildren) {
      let vm = this
      let result = 0

      const getCount = function (nodeChildren) {
        for (let i = 0; i < nodeChildren.length; i++) {
          const item = nodeChildren[i]

          if (vm.value.includes(item[vm.valueKey])) {
            result++
          }

          if (item[vm.childrenKey]) {
            getCount(item[vm.childrenKey])
          }
        }
      }

      getCount(nodeChildren)

      return result
    },

    /**
    * 功能: 判断是否有子节点被禁用
    * @param {Object} node 要判断的节点
    */
    hasDisabledChildNode (node) {
      let result = false
      let vm = this

      let fn = function (nodeChildren) {
        for (let i = 0; i < nodeChildren.length; i++) {
          const item = nodeChildren[i]

          if (vm.disabledVals.includes(item[vm.valueKey])) {
            result = true
            return
          }

          if (item[vm.childrenKey]) {
            fn(item[vm.childrenKey])
          }
        }
      }

      if (node[vm.childrenKey]) {
        fn(node[vm.childrenKey])
      }

      return result
    },

    /**
    * 功能: 初始化
    */
    init () {
      if (this.isChild) {
        this.treeRoot = this.root
      } else {
        this.treeRoot = this
        this.initExpandedValues()
        this.$watch('data', this.correctValue, { deep: true })
        this.$watch('expandedValues', this.updateCollapse, { deep: true })
      }
    },

    /**
    * 功能: 修正树选中的值,以下情况需要调用
    *   1、如在外面跟改禁用值时
    *   2、增加或/删除树节点数据时
    */
    correctValue () {
      const allValues = this.$ui.tree.nodes(this.treeRoot.data).map(item => item[this.valueKey])
      let result

      if (this.multiple) {
        result = JSON.parse(JSON.stringify(this.value || []))
      } else {
        if (!this.value) {
          return
        }

        result = [this.value]
      }

      // 外层组件有可能删除节点，这时需要删除多余的值
      result = result.filter(item => allValues.includes(item))

      // 外层组件有可能禁用节点，这时需要删除掉禁用的值
      result = result.filter(item => !this.disabledVals.includes(item))

      if (this.multiple) {
        // 外层组件懒加载父节点时，有可能父节点是选中状态，这时所有懒加载过来的子节点都要选中
        if (this.linked && !this.onlySelectLeaf) {
          let vm = this

          const fn = function (tree) {
            tree.forEach(item => {
              let value = item[vm.valueKey]

              if (result.includes(value) && item[vm.childrenKey]) {
                const vals = vm.$ui.tree.nodes(item[vm.childrenKey]).map(item => item[vm.valueKey])
                result = result.concat(vals)
              }
            })
          }

          fn(this.data)
        }

        result = [...new Set(result)]
      } else {
        result = result[0] || ''
        if (result === this.value) {
          return
        }
      }

      this.handleValueEvent(result)
    },

    /**
    * 功能: 处理与value相关的事件
    * @param {Object} node 选择的节点
    */
    handleValueEvent (result) {
      let nodes = this.$ui.tree.flat(this.treeRoot.data, result, this.valueKey)
      nodes = this.multiple ? nodes : nodes[0] || null

      this.treeRoot.$emit('input', result)
      this.treeRoot.$emit('change', result, nodes)
    },

    /**
    * 功能: 单击节点处理
    * @param {Object} node 选择的节点
    */
    clickNode (node) {
      if (this.resultClickNodeIs === 'select') {
        this.selectNode(node)
      } else if (this.resultClickNodeIs === 'expand') {
        if (node[this.childrenKey]) {
          this.toggleCollapse(node)
        } else {
          this.selectNode(node)
        }
      }
    },

    /**
    * 功能: 选择节点
    * @param {Object} node 选择的节点
    */
    selectNode (node) {
      if (this.isDisabled(node)) {
        return
      }

      if (this.multiple) {
        this.result = JSON.parse(JSON.stringify(this.value || []))
      } else {
        this.result = this.value
      }

      let value = node[this.valueKey]

      if (this.multiple) {
        if (this.onlySelectLeaf) {
          if (node[this.childrenKey]) {
            if (this.childrenAreAllSelected(node)) {
              this.selectChildrenNodes(node, false)
            } else {
              this.selectChildrenNodes(node, true)
            }
          } else {
            this.$ui.arr.toggle(this.result, value)
          }

          this.selectParentNodes()
        } else {
          if (this.isSelected(node)) {
            this.$ui.arr.del(this.result, value)
            this.selectChildrenNodes(node, false)
          } else {
            this.result.push(value)
            this.selectChildrenNodes(node, true)
          }
        }

        this.result.sort()
      } else {
        if (this.onlySelectLeaf && node[this.childrenKey]) {
          return
        }

        if (this.result === value) {
          return
        } else {
          this.result = value
        }
      }

      const result = JSON.parse(JSON.stringify(this.result))
      this.handleValueEvent(result)
    },

    /**
    * 功能: 获取所有需要选中的子节点值
    * @param {Object} node 节点
    * @param {Boolean} selected 是否选中
    */
    selectChildrenNodes (node, selected) {
      if (this.linked) {
        let vm = this

        const fn = function (children) {
          for (let i = 0; i < children.length; i++) {
            const item = children[i]
            const value = item[vm.valueKey]

            if (selected) {
              if (vm.onlySelectLeaf) {
                if (!item[vm.childrenKey]) {
                  if (!vm.result.includes(value) && !vm.isDisabled(item)) {
                    vm.result.push(value)
                  }
                }
              } else {
                if (!vm.result.includes(value) && !vm.isDisabled(item)) {
                  vm.result.push(value)
                }
              }
            } else {
              vm.$ui.arr.del(vm.result, value)
            }

            if (item[vm.childrenKey]) {
              fn(item[vm.childrenKey])
            }
          }
        }

        if (node[this.childrenKey]) {
          fn(node[this.childrenKey])
        }
      }
    },

    /**
    * 功能: 获取所有需要选中的父节点值
    */
    selectParentNodes () {
      if (this.linked) {
        let parent = null
        let parentNode = null

        if (this.parent) {
          parent = this
        }

        while (parent && parent.subTreeNode) {
          parentNode = parent.subTreeNode
          const childrenvalue = parentNode[this.childrenKey].map(item => item[this.valueKey])
          const mixed = this.result.filter(item => childrenvalue.includes(item))

          if (mixed.length === childrenvalue.length) {
            if (!this.result.includes(parentNode[this.valueKey])) {
              this.result.push(parentNode[this.valueKey])
            }
          } else {
            this.$ui.arr.del(this.result, parentNode[this.valueKey])
          }

          parent = parent.parent
        }
      }
    },

    /**
    * 功能: 收起/展开树节点
    * @params {Object} node 当前点击的节点
    */
    toggleCollapse (node) {
      this.$ui.arr.toggle(this.treeRoot.expandedVals, node[this.valueKey])

      if (this.isExpanded(node)) {
        this.treeRoot.$emit('expand', node)
        if (node[this.childrenKey].length === 0) {
          this.treeRoot.$emit('load', node)
        }
      } else {
        this.treeRoot.$emit('collapse', node)
      }

      this.treeRoot.$emit('update:expandedValues', this.treeRoot.expandedVals)
    },

    /**
    * 功能: 更新展开/收起
    */
    updateCollapse () {
      if (!this.$ui.arr.equal(this.treeRoot.expandedVals, this.treeRoot.expandedValues)) {
        this.treeRoot.expandedVals = JSON.parse(JSON.stringify(this.treeRoot.expandedValues))
      }
    }
  },

  created () {
    this.init()
  }
}
</script>

<style lang="scss">
  @import "./tree.scss";
</style>
