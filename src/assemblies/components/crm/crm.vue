<template>
  <div class="tw-crm">
    <div v-for="(crm, index) in crms" :key="index" class="tw-crm-item">
      <span class="tw-crm-self" @click="go(crm.link)" :class="{'active':crm.link}">{{crm.name}}</span>
      <i class="tw-crm-arrow" v-if="crm.link"></i>
    </div>
</div>
</template>

<script>
export default {
  name: 'tw-crm',
  props: {
    crms: {
      type: Array,
      required: true
    }
  },
  methods: {
    go (link) {
      if (link) {
        this.$router.push({ path: link })
      }
    }
  },
  created () {
    // console.log(this.crms)
  }
}
</script>
<style lang="scss" scoped>
  .tw-crm-self{
    &.active{
      color: #333;
      &:hover{
        cursor: pointer;
      }
    }
  }
</style>
