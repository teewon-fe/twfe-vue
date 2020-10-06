<template>
  <div>
    <template v-if="UI_APP_REGION==='jx'">
      <div class="py-step"
        v-for="item in resultData"
        :key="item.id">
        <span v-if="item.id==='5'">符合条件的政策类型学生</span>
        <span v-else-if="item.id==='6'">符合条件的非嘉兴市本级户籍学生（新居民类学生）</span>
        <span v-else-if="item.id==='7'">监护人提供无房证明或共有产权房证明</span>
        <span v-else-if ="item.id === '0' &&  resultData.length === 1 && onlyOneHousehold">{{`${item.name}${item.options.filter(opt=>opt.id===item.value)[0].name}`}}，且情况不属于前几批次</span>
        <span v-else>{{`${item.name}${item.options.filter(opt=>opt.id===item.value)[0].name}`}}</span>
      </div>
    </template>
    <template v-if="UI_APP_REGION==='ph'">
      <div class="py-step"
        v-for="item in resultData"
        :key="item.id">
        <span v-if="item.id===UI_ADMISSION_BASES_POLICY_STUDENT">政策安置类学生；</span>
        <span v-else-if="item.id===UI_ADMISSION_BASES_NOT_CITY_HOUSEHOLD_STUDENT">非户籍类学生；</span>
        <span v-else-if="item.id===UI_ADMISSION_BASES_GUARDIAN_NO_HOUSE">监护人提供无房证明；</span>
        <span v-else-if="item.id===UI_ADMISSION_BASES_GUARDIAN_PUBLIC_HOUSE">父母在施教区经商或务工的；</span>
        <span v-else-if="item.id===UI_ADMISSION_BASES_GUARDIAN_NEW_RESIDENT_CARD">监护人新居民积分卡；</span>
        <span v-else-if="item.id===UI_ADMISSION_BASES_RESETTLEMENT_STUDENT">拆迁安置类学生；</span>
        <span v-else>{{`${item.name}${item.options.filter(opt=>opt.id===item.value)[0].name}`}}；</span>
      </div>
    </template>
  </div>
</template>

<script>
import jxDictionary from '@/data/jx-dictionary.js'
import phDictionary from '@/data/ph-dictionary.js'

export default {
  name: 'tw-translate-admission-basis',

  props: {
    data: {
      type: Array,
      required: true
    },

    autoAddOptions: {
      type: Boolean,
      default: false
    },
    onlyOneHousehold: { // 嘉兴特殊需求，当录取批次仅包含“学生户籍”一个模块，无其他条件的。则在录取依据文字描述中，显示“学生户籍在XXX，且情况不属于前几批次”
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      // 引入数据字典
      ...(this.UI_APP_REGION === 'jx' ? jxDictionary : phDictionary),

      resultData: []
    }
  },

  methods: {
    /**
     * 功能: 初始化数据
     */
    init () {
      this.resultData = JSON.parse(JSON.stringify(this.data))

      this.resultData = this.resultData.filter(item => (item.show && item.value !== false) || (typeof item.show === 'undefined'))

      if (this.autoAddOptions) {
        this.attachAdmissionBasisProps(this.resultData)
      }

      this.resultData.sort((a, b) => parseInt(a.id) - parseInt(b.id))
    },

    /**
     * 功能: 附加依赖字典数据
     *  @param {Array} bases 要附加依赖字典数据的数组
     */
    attachAdmissionBasisProps (bases) {
      let userSection = this.$store.state.user.userSection
      if (userSection === '0') {
        bases.forEach(basis => {
          Object.assign(basis, this.childAdmissionBases.filter(item => item.id === basis.id)[0])
        })
      } else {
        bases.forEach(basis => {
          Object.assign(basis, this.admissionBases.filter(item => item.id === basis.id)[0])
        })
      }
    }
  },

  created () {
    this.init()
  },

  watch: {
    data: {
      handler (val) {
        this.init()
      },
      deep: true
    }
  }
}
</script>
