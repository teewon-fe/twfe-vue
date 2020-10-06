<template>
  <div class="tw-tagfilter"
    :class="{xopen: open || !isFold}">
    <label v-if="title"
      class="tw-tagfilter-label"
      :style="{width: labelWidth}">{{title}}:</label>
    <div ref="tag-box"
      class="tw-tagfilter-tags">
      <a class="tw-tag xfilter"
        :class="{xactive: value.length===0}"
        v-if="multiple && multipleBtnVisible"
        @click="$emit('change',[])">
        <span>全部</span>
      </a>
      <a class="tw-tag xfilter"
        v-for="tag in options"
        :class="{xactive: multiple ? value.includes(tag[keyMap.value]):value===tag[keyMap.value]}"
        :key="tag.value"
        @click="clickTag(tag)">
        <span>{{tag[keyMap.text]}}</span>
      </a>
      <a v-if="isFold && showToggleBtn"
        class="tw-ico xtftoggle"
        :class="{xopen: open}"
        @click="open=!open"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tw-tag-filter',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    // 标题宽度
    labelWidth: {
      type: String,
      default: ''
    },

    // 标题
    title: {
      type: String,
      default: ''
    },

    // 选择项
    options: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },

    // 当前选中的值
    value: {
      type: [Number, Boolean, String, Array],
      required: true
    },

    // 显示文本与值在选择项中的属性名称映射关系
    keyMap: {
      type: Object,
      default () {
        return {
          text: 'name',
          value: 'value'
        }
      }
    },

    // 是否开启多选
    multiple: {
      type: Boolean,
      default: false
    },

    // 多选按钮可见
    multipleBtnVisible: {
      type: Boolean,
      default: true
    },

    // 显示收缩按钮的高度值
    toggleHeight: {
      type: Number,
      default: 50
    },

    // 单选状态进是否允许切换自身
    toggleSelf: {
      type: Boolean,
      default: false
    },

    // 是否需要收起展开
    isFold: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      showToggleBtn: false,
      open: false
    }
  },

  methods: {
    /**
     * 功能: 初始化是否显示切换按钮及选中状态等
     */
    init () {
      this.$nextTick(() => {
        if (this.$refs['tag-box'].offsetHeight > this.toggleHeight) {
          this.showToggleBtn = true
        }
      })
    },

    /**
     * 功能: 点击标签处理
     * @param {Object} tag 标签对应的数据对象
     */
    clickTag (tag) {
      if (this.multiple) {
        // 多选处理
        if (this.value.includes(tag[this.keyMap.value])) {
          this.value.splice(this.value.indexOf(tag[this.keyMap.value]), 1)
          this.$emit('change', this.value)
        } else {
          this.value.push(tag[this.keyMap.value])
          this.$emit('change', this.value)
        }
      } else {
        // 单选处理
        if (this.value === tag[this.keyMap.value]) {
          if (this.toggleSelf) {
            debugger
            this.$emit('change', '')
          }
        } else {
          this.$emit('change', tag[this.keyMap.value])
        }
      }
    }
  },

  mounted () {
    this.init()
  },

  watch: {
    options () {
      this.init()
    }
  }
}

</script>
<style lang="scss">
@import "tag-filter.scss";
</style>
