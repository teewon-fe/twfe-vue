<template>
  <div class="tw-relational">
    <!-- 图表容器 -->
    <div class="tw-relational-chart">
      <tw-svg-curve :curves="curves" />
    </div>
    <!-- /图表容器 -->

    <!-- 树容器 -->
    <div class="tw-reltree">
      <!-- 左侧节点列表 -->
      <ul class="tw-reltree-side xleft">
        <li class="tw-reltree-node"
          v-for="(node,nodeIndex) in left.data"
          :key="nodeIndex">
          <div ref="nodes"
               class="tw-reltree-node-label"
               :style="{borderColor: leftColors[nodeIndex % leftColors.length]}">
               <div class="tw-reltree-node-label-text">
                 <slot name="node-label" :node="node"><span>{{node.name}}</span></slot>
               </div>
               <div class="tw-reltree-node-line"
                    :style="{backgroundColor: leftColors[nodeIndex % leftColors.length]}">
                </div>
          </div>
          <ul class="tw-reltree-node-list">
            <li class="tw-reltree-node-item"
                v-for="(item,itemIndex) in node.children"
                :key="`${nodeIndex}-${itemIndex}`">
                <div class="tw-reltree-node-itemlink"
                  :style="{borderColor: leftColors[nodeIndex % leftColors.length]}">
                  <slot name="node-item" :item="item"><span>{{item.name}}</span></slot>
                </div>
            </li>
          </ul>
        </li>
      </ul>
      <!-- /左侧节点列表 -->

      <!--  数据库图标 -->
      <div ref="center" class="tw-reltree-center">
        <div class="tw-reltree-database"><slot name="database-name">Database</slot></div>
      </div>
      <!-- /数据库图标 -->

      <!--  右侧节点列表 -->
      <ul class="tw-reltree-side xright">
        <li class="tw-reltree-node"
          v-for="(node,nodeIndex) in right.data"
          :key="nodeIndex">
          <div ref="nodes"
               class="tw-reltree-node-label"
               :style="{borderColor: rightColors[nodeIndex % rightColors.length]}">
               <div class="tw-reltree-node-label-text">
                 <slot name="node-label" :node="node"><span>{{node.name}}</span></slot>
               </div>
               <div class="tw-reltree-node-line"
                  :style="{backgroundColor: rightColors[nodeIndex % rightColors.length]}">
               </div>
          </div>
          <ul class="tw-reltree-node-list">
            <li class="tw-reltree-node-item"
                v-for="(item,itemIndex) in node.children"
                :key="`${nodeIndex}-${itemIndex}`">
                <div class="tw-reltree-node-itemlink"
                  :style="{borderColor: rightColors[nodeIndex % rightColors.length]}">
                  <slot name="node-item" :item="item"><span>{{item.name}}</span></slot>
                </div>
            </li>
          </ul>
        </li>
      </ul>
      <!-- /右侧节点列表 -->
    </div>
    <!-- /树容器 -->
  </div>
</template>

<script>
import svgCurve from '@comps/svg-curve/svg-curve.vue'

export default {
  name: 'tw-relational-tree',

  props: {
    data: {
      type: Array,
      required: true
    },
    leftColors: {
      type: Array,
      default () {
        return ['#964280', '#564c89', '#b4ceef']
      }
    },
    blankSize: {
      type: Number,
      default: 3
    },
    rightColors: {
      type: Array,
      default () {
        return ['#ffa09d', '#fdca54', '#80cd67']
      }
    }
  },

  components: {
    'tw-svg-curve': svgCurve
  },

  data () {
    return {
      left: {
        data: []
      },
      right: {
        data: []
      },
      curves: []
    }
  },

  methods: {
    /**
     * 功能：获取指定数据中包含的总节点数
     * @param {Array} data 包含节点的数组
     */
    getNodeItemNum (data) {
      let result = 0

      data.forEach(node => {
        result += node.children.length
      })

      return result
    },

    /**
     * 功能：加工数据,生成数据地图数据模型,使图表两边的数据量大致相等
     */
    genarateData () {
      if (this.data.length === 0) return

      [this.left.data[0], ...this.right.data] = this.data

      let leftNum = this.data[0].children.length
      let rightNum = this.getNodeItemNum(this.right.data)

      for (var i = 0; i < this.right.data.length; i++) {
        let diff = (rightNum + this.right.data.length * this.blankSize) - (leftNum + this.left.data.length * this.blankSize)
        if (diff <= 0) return

        const item = this.right.data[i]

        if (item.children.length <= diff) {
          this.left.data.push(item)
          this.right.data.splice(i--, 1)
          leftNum += item.children.length
          rightNum -= item.children.length
        }
      }
    },

    /**
     * 功能：生成曲线坐标点
     */
    genarateCurves () {
      this.curves = []

      const center = {
        x: this.$el.offsetWidth / 2,
        y: this.$el.offsetHeight / 2
      }

      if (!this.$refs.nodes) return

      this.$refs.nodes.forEach((el, index) => {
        this.curves.push({
          p1: {
            x: el.offsetLeft + (index < this.left.data.length ? el.offsetWidth : 0),
            y: el.offsetTop + el.offsetHeight / 2
          },
          p2: {
            x: center.x + (index < this.left.data.length ? -15 : 15),
            y: center.y
          },
          color: index < this.left.data.length
            ? this.leftColors[index % this.leftColors.length]
            : this.rightColors[index % this.rightColors.length]
        })
      })
    }
  },

  created () {
    this.genarateData()
  },

  mounted () {
    this.genarateCurves()
    window.addEventListener('resize', this.genarateCurves)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.genarateCurves)
  },

  watch: {
    data () {
      this.genarateData()

      this.$nextTick(() => {
        this.genarateCurves()
      })
    }
  }
}
</script>

<style lang="scss">
  @import './relational-tree.scss';
</style>
