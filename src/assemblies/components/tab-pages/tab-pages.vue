<template>
  <div class="tw-tabpages">
    <!-- tab标签 -->
    <ul ref="tabBox"
      class="tw-tabs xcard xpage"
      :class="{xcode: pages.length > 0 && currentIndex<pages.length && pages[currentIndex].type!=='dir'}">
      <li ref="tabNav"
        :style="{marginLeft:index===0?offsetX+'px':''}"
        :class="{xopen: index===currentIndex}"
        v-for="(page,index) in pages"
        :key="`tab-page-${index}`"
        @click="$emit('update:activeIndex', index)">
        <a>
          <i v-if="page.iconClass"
            :class="[page.iconClass]"></i>
          <span>{{page.title}}</span>
          <i class="tw-ico xiclose"
            @click.stop="closeSelf(index)"></i>
        </a>
      </li>

      <!-- tab标签工具 -->
      <li ref="tools"
        class="tw-tabs-tools">
        <a class="tw-iconbtn"
          :class="{xdisabled: offsetX===0}"
          @click="slideTab('left')"><i class="tw-ico xtabal"></i></a>
        <a class="tw-iconbtn"
          :class="{xdisabled: !activeRightSlide}"
          @click="slideTab('right')"><i class="tw-ico xtabar"></i></a>
        <a class="tw-iconbtn js-tab-close"><i class="tw-ico xtabclose"></i></a>

        <tw-poppane switch=".js-tab-close"
          trigger="click"
          :noArrow="true">
          <ul class="tw-tree-menu">
            <li @click="closeOther"><a>关闭其他</a></li>
            <li @click="closeAll"><a>关闭全部</a></li>
          </ul>
        </tw-poppane>
      </li>
      <!-- /tab标签工具 -->
    </ul>
    <!-- /tab标签 -->

    <div class="tw-collapse xtabs xpage"
      :class="{xopen: index===currentIndex, xcode: page.type!=='dir'}"
      v-for="(page,index) in pages"
      :key="`tab-page-${index}`">
      <slot :page="page"
        :pageIndex="index"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tw-tab-pages',

  props: {
    pages: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    slideDistance: {
      type: Number,
      default: 300
    }
  },

  data () {
    return {
      currentIndex: this.activeIndex,
      offsetX: 0,
      activeRightSlide: true
    }
  },

  methods: {
    /**
     * 功能: 检测tab列表项是否超出容器最右侧
     */
    detectOverflow () {
      if (this.pages.length === 0) return

      const tabBox = this.$refs.tabBox
      const tabWidth = tabBox.offsetWidth
      const tabNavs = this.$refs.tabNav
      const toolsWidth = this.$refs.tools.offsetWidth

      let width = 0

      for (let i = 0; i < tabNavs.length; i++) {
        width += tabNavs[i].offsetWidth
      }

      const diff = tabWidth - width - toolsWidth

      if (this.offsetX <= diff) {
        this.activeRightSlide = false
        this.offsetX = diff > 0 ? 0 : diff
      } else {
        this.activeRightSlide = true
      }

      if (diff > 0) this.offsetX = 0
    },

    /**
     * 功能: 滑动tab标签
     * @param {String} type 指示向哪个方向滑动 left-向左滑动 right-向右滑动
     */
    slideTab (type) {
      if (type === 'left' && this.offsetX !== 0) {
        this.offsetX += this.slideDistance

        if (this.offsetX > 0) this.offsetX = 0
      }

      if (type === 'right' && this.activeRightSlide) {
        this.offsetX -= this.slideDistance
      }

      this.detectOverflow()
    },

    /**
     * 功能: 激活指定的Tab
     * @param {Number} index tab的索引值
     */
    activeTab (index) {
      this.currentIndex = index

      const tabBox = this.$refs.tabBox
      const tabWidth = tabBox.offsetWidth
      const tabNavs = this.$refs.tabNav
      const toolsWidth = this.$refs.tools.offsetWidth
      let width = 0

      for (let i = 0; i < tabNavs.length; i++) {
        if (i >= index) break
        width += tabNavs[i].offsetWidth
      }

      const offsetDiff = width + this.offsetX

      if (offsetDiff <= 0) {
        this.offsetX = -width
      }

      if (offsetDiff >= tabWidth - toolsWidth) {
        this.offsetX = -width + (tabWidth - this.slideDistance - toolsWidth)
      }

      this.detectOverflow()
    },

    /**
     * 功能: 关闭自身
     * @param {Number} index tab的索引值
     */
    closeSelf (index) {
      const vm = this
      const next = () => {
        vm.pages.splice(index, 1)
        vm.$emit('update:pages', vm.pages)

        if (vm.currentIndex >= vm.pages.length) {
          vm.$nextTick(() => {
            vm.$emit(
              'update:activeIndex',
              vm.pages.length === 0 ? 0 : vm.pages.length - 1
            )
          })
        }
      }

      vm.$emit('close', index, next)
    },

    /**
     * 功能: 关闭除自身之外的其他标签tab
     */
    closeOther () {
      const next = () => {
        this.$emit('update:pages', [this.pages[this.currentIndex]])
        this.$emit('update:activeIndex', 0)
      };

      this.$emit('closeOther', this.currentIndex, next)
    },

    /**
     * 功能: 关闭所有标签tab
     */
    closeAll () {
      const next = () => {
        this.$emit('update:pages', [])
        this.$emit('update:activeIndex', 0)
      };

      this.$emit('closeAll', next)
    }
  },

  mounted () {
    this.detectOverflow()
  },

  watch: {
    /**
     * 功能: tab页增减时，重新检测tab标签是否有超出
     */
    pages () {
      this.$nextTick(() => {
        this.detectOverflow()
      })
    },

    /**
     * 功能: 监控激活索引值的改变
     */
    activeIndex (val) {
      this.activeTab(val)
    }
  }
}
</script>
