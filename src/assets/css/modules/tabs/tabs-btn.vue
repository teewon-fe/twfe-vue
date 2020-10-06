<template>
  <tw-collapse-group disable-toggle-self>
    <ul class="tw-btngroup">
      <li class="js-btn1"><a class="tw-btn xweaking">选项卡1</a></li>
      <li class="js-btn2"><a class="tw-btn xweaking">选项卡2</a></li>
    </ul>
    <tw-collapse
      class="xtabs"
      switch=".js-btn1"
      default-open>
      <div>内容1</div>
    </tw-collapse>
    <tw-collapse
      class="xtabs"
      switch=".js-btn2">
      <div>内容2</div>
    </tw-collapse>
  </tw-collapse-group>
</template>
