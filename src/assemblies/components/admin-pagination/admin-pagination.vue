<template>
  <div class="tw-adminpagination">
    <div class="tw-adminpagination-left">
      <span v-if="total === 0">共{{total}}条记录</span>
      <span v-else>显示{{start}}到{{end}},共{{total}}条记录</span>
    </div>
    <ul class="tw-adminpagination-right">
      <li>
        <a class="tw-adminpagination-pagesize tw-popswitch"
          :class="`js-adminpagination-${_uid}`">
          <span>{{size}}</span>
        </a>

        <tw-poppane
          trigger='click'
          :switch="`.js-adminpagination-${_uid}`">
          <ul class="tw-select-pane">
            <li class="tw-select-item"
              :class="{xactive: size===item}"
              v-for="item in pageSizes"
              :key="item"
              @click="changPageSize(item)">
              <span>{{item}}</span>
            </li>
          </ul>
        </tw-poppane>
      </li>

      <li>
        <a class="tw-adminpagination-pagebtn"
          :class="{xdisabled: value <= 1}"
          @click="changePage(1,'first')">
          <i class="tw-ico xapfirst"></i>
        </a>
        <a class="tw-adminpagination-pagebtn"
          :class="{xdisabled: value <= 1}"
          @click="changePage(value-1,'prev')">
          <i class="tw-ico xapprev"></i>
        </a>
      </li>

      <li>
        <span>第 </span>
        <input
          ref="input"
          class="tw-adminpagination-currentpage"
          type="text"
          :value="value"
          @blur="inputPage"
          @keyup.enter="inputPage">
        <span> 页 共{{pageTotal}}页</span>
      </li>

      <li>
        <a class="tw-adminpagination-pagebtn"
          :class="{xdisabled: value >= pageTotal}"
          @click="changePage(value + 1,'next')">
          <i class="tw-ico xapnext"></i>
        </a>
        <a class="tw-adminpagination-pagebtn"
          :class="{xdisabled: value >= pageTotal}"
          @click="changePage(pageTotal,'last')">
          <i class="tw-ico xaplast"></i>
        </a>
      </li>

      <!-- <li>
        <a class="tw-adminpagination-pagebtn" @click="$emit('refresh')">
          <i class="tw-ico xaprefresh"></i>
        </a>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tw-admin-pagination',

  props: {
    // 每页显示多少行数据
    pageSize: {
      type: Number,
      default: 50
    },

    // 总行数
    total: {
      type: Number,
      default: 0
    },

    // 总页数
    pageCount: {
      type: Number,
      default: 0
    },

    // 当前页码
    value: {
      type: Number,
      default: 1
    },

    // 每页显示行数选择器的选项设置
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50, 100]
      }
    }
  },

  data () {
    return {
      size: this.pageSize
    }
  },

  computed: {
    // 显示记录开始序号
    start () {
      return (this.value - 1) * this.pageSize + 1
    },

    // 显示记录结束序号
    end () {
      const result = this.value * this.pageSize
      return this.total < result ? this.total : result
    },

    // 总页数
    pageTotal () {
      return Math.ceil(this.total / this.pageSize)
    }
  },

  methods: {
    /**
    * 功能: 更改显示的行数
    * @param {Number} pageSize 每页显示多少行
    */
    changPageSize (pageSize) {
      if (this.size !== pageSize) {
        this.size = pageSize
        this.$emit('input', 1)
        this.$emit('update:pageSize', pageSize)
        this.$emit('sizeChange', pageSize)
      }
    },

    /**
    * 功能: 改变当前页码
    * @param {Number} pageNo 切换后的页号
    * @param {String} type 导致页面改变的操作类型 first-第一页 prev-上一页 next-下一页 last-最后一页 input-输入框输入
    */
    changePage (pageNo, type) {
      if (pageNo < 1) pageNo = 1
      if (pageNo > this.pageTotal) pageNo = this.pageTotal
      if (type === 'input') this.$refs.input.value = pageNo

      if (this.value !== pageNo) {
        this.$emit('input', pageNo)
        this.$emit('pageChange', pageNo, type)
      }
    },

    /**
    * 功能: 在文本框中输入页码
    * @param {Object} event 输入文本框事件对象
    */
    inputPage (event) {
      const num = parseInt(event.target.value)

      if (isNaN(num)) {
        event.target.value = this.value
      } else {
        this.changePage(num, 'input')
      }
    }
  },

  created () {
    window.abc = this
  }
}
</script>
