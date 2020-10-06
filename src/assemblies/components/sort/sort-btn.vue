<template>
  <a class="tw-sortbtn"
    :class="['x'+sort]"
    @click="handleClick">
    <i v-if="sort==='asc'"
      class="tw-ico xasc"></i>
    <i v-if="sort==='desc'"
      class="tw-ico xdesc"></i>
    <template v-if="$app.appType==='mobile'">
      <i v-if="sort==='default'"
        class="tw-ico xdefault"></i>
    </template>

    <slot>
      <span>{{text[sort]}}</span>
    </slot>
  </a>
</template>

<script>
export default {
  name: 'tw-sort-btn',

  props: {
    initValue: String,

    defaultValue: {
      type: String,
      default: 'default'
    },

    sortKey: String,

    defaultText: {
      type: String,
      default: '排序'
    },

    ascText: {
      type: String,
      default: '升序'
    },

    descText: {
      type: String,
      default: '降序'
    },

    toggleOrder: {
      type: Array,
      default () {
        return ['default', 'desc', 'asc']
      }
    }
  },

  data () {
    return {
      sort: 'default',
      group: null
    }
  },

  computed: {
    text () {
      return {
        default: this.defaultText,
        asc: this.ascText,
        desc: this.descText
      }
    }
  },

  methods: {
    getGroup () {
      let parent = this.$parent

      while (parent) {
        if (parent.$options.name === 'tw-sort-group') {
          this.group = parent

          if (!this.group.sortBtns.includes(this)) {
            this.group.sortBtns.push(this)

            if (this.initValue && !this.group.multiple) {
              this.group.currSortBtn = this
            }

            this.updateGroupValue()
          }

          break
        }

        parent = parent.$parent
      }
    },

    updateGroupValue () {
      if (this.group) {
        if (!this.sortKey) {
          throw new Error('The sort key is required.')
        } else {
          this.$set(this.group.groupValue, this.sortKey, this.sort)
        }
      }
    },

    handleEvent () {
      this.$emit('change', this.sort)
      this.updateGroupValue()
    },

    handleClick () {
      let order = this.toggleOrder
      this.sort = order[(order.indexOf(this.sort) + 1) % order.length]

      if (this.group) {
        this.group.currSortBtn = this
      }

      this.handleEvent()
    },

    reset () {
      if (this.sort !== this.defaultValue) {
        this.sort = this.defaultValue
        this.handleEvent()
      }
    }
  },

  created () {
    this.getGroup()
  },

  watch: {
    initValue: {
      immediate: true,
      handler (val) {
        this.sort = val || 'default'
      }
    }
  }
}
</script>

<style lang="scss">
@import "./sort-btn.scss";
</style>
