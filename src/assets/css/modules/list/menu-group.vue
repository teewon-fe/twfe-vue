<template>
  <ul class="tw-list">
    <li class="tw-list-item" :class="{xdisabled:item[disabledKey]}" v-for="(item, index) in items" :key="index">
        <slot v-bind="{item:item}">{{ item[textKey] }}</slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'twList',
  props: {
    items: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: [String, Number, Object, Array],
    valueKey: {
      type: String,
      default: 'value'
    },
    textKey: {
      type: String,
      default: 'text'
    },
    disabledKey: {
      type: String
    },
    link: {
      type: String,
      default: ''
    }
  },
  methods: {
  }
}
</script>
