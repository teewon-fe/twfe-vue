<template>
  <div class="tw-search">
    <div class="tw-search-inputbox">
      <input :value="value"
        type="text"
        @input="$emit('input', $event.target.value)"
        @keypress.enter="search"
        :placeholder="placeholder" />
    </div>

    <div class="tw-search-btnbox"
      @click="search">
      <i class="tw-ico xsearch"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tw-search',

  props: {
    value: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: '请输入搜索关键字'
    }
  },

  data () {
    return {
      keyword: ''
    }
  },

  methods: {
    search () {
      this.$emit('search', this.keyword)
    }
  }
}
</script>

<style lang="scss">
@import "search.scss";
</style>
