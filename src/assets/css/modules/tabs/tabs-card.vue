<template>
  <tw-collapse-group disable-toggle-self>
    <ul class="tw-tabs xcard">
      <li class="js-nav1"><a>选项卡1</a></li>
      <li class="js-nav2"><a>选项卡2</a></li>
      <li class="js-nav3"><a>内容最多8个字内容最</a></li>
    </ul>
    <tw-collapse
      class="xtabs"
      switch=".js-nav1"
      default-open>
      <div>内容1</div>
    </tw-collapse>
    <tw-collapse
      class="xtabs"
      switch=".js-nav2">
      <div>内容2</div>
    </tw-collapse>
    <tw-collapse
      class="xtabs"
      switch=".js-nav3">
      <div>内容3</div>
    </tw-collapse>
  </tw-collapse-group>
</template>
