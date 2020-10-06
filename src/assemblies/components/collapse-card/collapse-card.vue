<template>
  <div class="tw-collapse-card">
    <div class="tw-collapse-cardtitle">
      {{title}}
      <el-switch v-model="switchValue" v-if="hasSwitch" @change="handleSwitchChange()" style="vertical-align:sub; margin-left:10px;"></el-switch>
      <a class="tw-collapse-cardtitle-toggle" :class="{'tw-collapse-isOpen' : bodyVisible}" @click="bodyStatus = !bodyStatus" v-if="hasToggle"></a>
    </div>
    <el-collapse-transition>
      <div class="tw-collapse-cardbody" v-show="bodyVisible">
        <slot name="body"></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'tw-collapse-card',

  props: {
    title: String,
    hasToggle: {
      type: Boolean,
      default: false
    },
    hasSwitch: {
      type: Boolean,
      default: false
    },
    switchTarget: {
      type: String
    }
  },

  data () {
    return {
      switchValue: false,
      bodyStatus: true
    }
  },

  computed: {
    bodyVisible () {
      if (this.hasSwitch) {
        return this.switchValue ? this.bodyStatus : false
      } else {
        return this.bodyStatus
      }
    }
  },

  methods: {
    handleSwitchChange () {
      // 不能改变组件的prop,而是通过事件来修改父组件的对应表单值
      if (this.switchValue) {
        this.bodyStatus = true
      }
      this.$emit('switchChange', [this.switchValue, this.switchTarget])
    }
  }

}
</script>

<style scoped lang="scss">
  @import url("./collapse-card.scss");
</style>
