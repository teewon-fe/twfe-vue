<template>
  <li class="tw-list-item" :class="{xdisabled:disabled}">
    <slot v-bind="{value, text}"></slot>
  </li>
</template>

<script>
export default {
  name: 'twListItem',
  props: {
    value: {
      type: [String, Number, Object],
      required: true
    },
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
