<template>
  <div class="tw-district">
    <div class="tw-district-body" @click="openPicker">
      <div class="tw-district-body-text">{{text || placeholder}}</div>
      <div class="tw-district-body-arrowbox"></div>
    </div>

    <mt-popup
      class="tw-district-popup"
      :modal="false"
      v-model="visible"
      position="bottom"
      style="width: 100%;">
      <div class="tw-district-optbox">
        <div class="tw-district-optbox-header">
          <div class="tw-district-optbox-title">请选择</div>
          <i class="tw-district-optbox-close" @click="closePicker">×</i>
        </div>
        <ul v-if="values.length>0" class="tw-district-selected">
          <li v-for="(item,index) in resultValues"
            :key="index"
            @click="changeRegion(index)">
            <span>{{mapRegion[item]}}</span>
          </li>
        </ul>
        <ul class="tw-district-option"
          v-loading="loading"
          element-loading-background="rgba(0, 0, 0, 0.15)">
          <template v-if="options.length>0">
            <li :class="{xselected: resultValues.includes(item.id)}"
              v-for="item in options"
              :key="item.id"
              @click="selectRegion(item)">
              <span>{{item.name}}</span>
            </li>
          </template>
          <li v-else class="text-center py-large text-weaking">已无子区域数据，<a class="tw-district-option-confirm" @click="closePicker">确定已选择的区域</a></li>
        </ul>
      </div>
    </mt-popup>

    <div v-if="visible"
      class="tw-district-modal"
      @click="clickCover"
      @touchmove.prevent>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tw-district',

  props: {
    value: Array,
    placeholder: String
  },

  data () {
    return {
      loading: false,
      values: [],
      visible: false,
      currentIndex: 0,
      options: [],
      regionChanged: false,
      mapRegion: {
        'ui-no-select': ''
      }
    }
  },

  computed: {
    text () {
      let result = ''
      this.values.forEach(item => {
        result += this.mapRegion[item]
      })

      return result
    },

    resultValues () {
      return this.values.filter(item => item !== 'ui-no-select')
    }
  },

  methods: {
    /**
    * 功能: 功能描述
    */
    openPicker () {
      this.visible = true

      if (this.values.length < 2) {
        this.getRegionById('', 0)
      } else {
        this.getRegionById(this.values[this.values.length - 2])
      }
    },

    /**
    * 功能: 查区域id对照的名称
    */
    getRegionNames () {
      const vm = this

      // 未选择任何值时不查询区域id对照的名称
      if (this.values.length === 0) return

      this.axios.post('/sysdictitem/getAreaNameByAreaIdApp', {
        areaIds: this.values
      }).then((resp) => {
        if (resp.data.serverResult.resultCode === '200') {
          let data = resp.data.responseEntity

          data.forEach((item, index) => {
            vm.$set(vm.mapRegion, vm.values[index], item)
          })
        } else if (resp.data.serverResult.resultCode === '999999') {
          vm.messageBox('提示', resp.data.serverResult.resultMessage)
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    /**
    * 功能: 按父区域设置所有有子区域(用于省市区联动)
    *  @param {String} regionId 根据该Id获取其子节点区域数据
    */
    getRegionById (regionId) {
      this.loading = true

      const vm = this

      // 非嘉兴市只获取到市数据
      if (this.values.length > 2 && this.values[1] !== '330400') {
        this.options = []
        vm.loading = false
        return
      }

      this.axios.post('/sysdictitem/getSysDictItemListByParentDictIdApp', {
        parentDictId: regionId
      }).then((resp) => {
        if (resp.data.serverResult.resultCode === '200') {
          const regions = resp.data.responseEntity

          // 【浙江省、嘉兴市、平湖市】提升到数组的第1个位置
          for (let i = 0; i < regions.length; i++) {
            let arr = ['330000', '330400']

            if (this.UI_APP_REGION === 'jx') {
              arr.push('330402')
            }

            if (this.UI_APP_REGION === 'ph') {
              arr.push('330482')
            }

            if (arr.includes(regions[i].id)) {
              regions.unshift(regions.splice(i, 1)[0])
              break
            }
          }

          vm.options = regions
        } else if (resp.data.serverResult.resultCode === '999999') {
          vm.messageBox('提示', resp.data.serverResult.resultMessage)
        }

        vm.loading = false
      }).catch((err) => {
        vm.loading = false
        console.log(err)
      })
    },

    /**
    * 功能: 改变区域
    * @param {Number} index 在区域列表(value)中的索引
    */
    changeRegion (index) {
      if (index === this.values.length - 1) return

      this.values.splice(index + 1)
      if (index === 0) {
        this.getRegionById('')
      } else {
        this.getRegionById(this.values[index - 1])
      }

      this.regionChanged = true
    },

    /**
    * 功能: 选择区域
    * @param {Object} region 区域对象
    */
    selectRegion (region) {
      this.$set(this.mapRegion, region.id, region.name)

      if (this.values.length === 0) {
        this.values.push(region.id)
      } else {
        this.values.splice(this.values.length - 1, 1, region.id)
      }

      this.values.push('ui-no-select')
      this.getRegionById(region.id)
    },

    /**
    * 功能: 处理点击护罩层
    */
    clickCover () {
      if (this.regionChanged && this.options.length > 0) {
        this.toast('请继续选择子区域')
        return
      }

      this.closePicker()
    },

    /**
    * 功能: 关闭picker
    */
    closePicker () {
      this.visible = false
      this.$emit('input', this.resultValues)
      this.$emit('done', this.resultValues, this.text)
    }
  },

  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.values = [...val]
        this.getRegionNames()
      }
    }
  }
}
</script>

<style lang="scss">
@import "./district.scss";
</style>
