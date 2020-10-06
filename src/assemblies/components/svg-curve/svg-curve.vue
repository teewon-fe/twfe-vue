<template>
  <svg :width="width" :height="height">
    <g fill="none">
      <path v-for="(curve, index) in curves" :key="index"
        stroke-width="2"
        :stroke="curve.color"
        :d="`M${curve.p1.x} ${curve.p1.y} C${curve.p1.x} ${curve.p1.y},${curve.p2.x} ${curve.p1.y},${curve.p2.x} ${curve.p2.y}`" />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'tw-svg-curve',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    curves: {
      type: Array,
      required: true
    }
  }
}
</script>
