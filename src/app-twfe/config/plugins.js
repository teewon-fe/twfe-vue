import Vue from 'vue'
import msgBoxes from '../../public/config/third-lib'

import * as utilsOption from '../data/utils'
import Utils from '@/assemblies/plugins/ui-utils'

import * as enumConst from '../data/const'
import ENUM from '@/assemblies/plugins/enum'

import * as dicData from '../data/dic'
import Dic from '@/assemblies/plugins/dic'

window.$ui = msgBoxes

Vue.use(Utils, {
  ...utilsOption,
  ...msgBoxes
})

Vue.use(ENUM, enumConst)
Vue.use(Dic, dicData)
