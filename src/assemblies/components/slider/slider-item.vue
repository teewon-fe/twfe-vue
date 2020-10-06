<template>
  <transition
    :leave-active-class="'animated' + leaveActiveClass"
    :enter-active-class="'animated' + enterActiveClass">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'tw-slider',
  props: {
    leaveActiveClass: {
      type: String,
      required: true
    },
    enterActiveClass: {
      type: String,
      required: true
    }
  },
  watch: {
    leaveActiveClass (value) {
      console.log(value)
    },
    enterActiveClass (value) {
      console.log(value)
    }
  }
}
</script>
