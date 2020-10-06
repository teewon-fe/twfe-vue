import Vue from 'vue'
import msgBoxes from '../../public/config/third-lib-mobile'

import * as utilsOption from '../data/utils'
import Utils from '@/assemblies/plugins/ui-utils'

import * as cnts from '../data/const'
import ENUM from '@/assemblies/plugins/enum'

import * as dicData from '../data/dic'
import Dic from '@/assemblies/plugins/dic'

import nativeConfig from '../../public/native-app'
import Native from '@/assemblies/plugins/native'

window.$ui = msgBoxes

Vue.use(Utils, {
  ...utilsOption,
  ...msgBoxes
})

Vue.use(ENUM, cnts)
Vue.use(Dic, dicData)

Vue.use(Native, nativeConfig)
