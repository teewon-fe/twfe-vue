<template>
  <tw-collapse-group disable-toggle-self>
    <ul class="tw-tabs">
      <li class="js-tab1"><a>选项卡1</a></li>
      <li class="js-tab2"><a>选项卡2</a></li>
      <li class="js-tab3"><a>内容最多8个字内容最</a></li>
    </ul>
    <tw-collapse
      class="xtabs"
      switch=".js-tab1"
      default-open>
      <div>内容1</div>
    </tw-collapse>
    <tw-collapse
      class="xtabs"
      switch=".js-tab2">
      <div>内容2</div>
    </tw-collapse>
    <tw-collapse
      class="xtabs"
      switch=".js-tab3">
      <div>内容3</div>
    </tw-collapse>
  </tw-collapse-group>
</template>
