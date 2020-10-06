<template>
  <div class="tw-sortgroup">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tw-sort-group',

  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      groupValue: {},
      currSortBtn: null,
      sortBtns: []
    }
  },

  created () {
    window.sg = this
  },

  watch: {
    groupValue: {
      deep: true,
      handler (val) {
        if (!this.multiple) {
          this.sortBtns.forEach(sortBtn => {
            if (sortBtn !== this.currSortBtn) {
              sortBtn.reset()
            }
          })
        }

        this.$emit('change', val, this.currSortBtn ? this.currSortBtn.sortKey : null)
      }
    }
  }
}
</script>
