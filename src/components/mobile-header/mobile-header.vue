<template>
  <header class="tw-header">
    <div id="header-left" class="tw-header-left">
      <slot name="left"></slot>
    </div>
    <div class="tw-header-body">
      <h1 id="header-body" slot="body" class="_ellipsis">
        <slot></slot>
      </h1>
    </div>
    <div id="header-right" class="tw-header-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'tw-header'
}
</script>

<style lang="scss">
@import "./header.scss";
</style>
